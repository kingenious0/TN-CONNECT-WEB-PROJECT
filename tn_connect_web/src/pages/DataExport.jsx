import React, { useState, useEffect } from 'react';
import { getStorageData, addAuditLog } from '../utils/mockData';

export default function DataExport() {
  const [members, setMembers] = useState([]);

  // Filters
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [exportFormat, setExportFormat] = useState('CSV');
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const data = getStorageData();
    setMembers(data.members);
  }, []);

  const filteredMembers = members.filter(m => {
    const matchesRole = roleFilter === 'All' || m.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
    return matchesRole && matchesStatus;
  });

  const handleExport = () => {
    if (filteredMembers.length === 0) {
      alert("No data to export based on current filters.");
      return;
    }

    setExporting(true);

    // Simulate export delay
    setTimeout(() => {
      setExporting(false);
      addAuditLog(`Exported ${filteredMembers.length} member records as ${exportFormat}`);
      alert(`Success! Exported ${filteredMembers.length} records in ${exportFormat} format.`);
    }, 1500);
  };

  return (
    <div className="space-y-gutter">
      {/* Page Title */}
      <div>
        <h2 className="text-[22px] font-bold leading-[28px] text-on-surface">Data Export</h2>
        <p className="text-[11px] leading-[16px] text-on-surface-variant">Query, filter, and export the member directory database.</p>
      </div>

      {/* Main Settings Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Side: Configuration Card */}
        <div className="lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm space-y-4">
          <h3 className="text-[15px] font-bold text-on-surface border-b border-outline-variant pb-1.5">Export Configuration</h3>
          
          {/* Role Filter */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-on-surface-variant block">Filter by Role</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant rounded-lg px-2.5 py-1.5 text-[12px] outline-none cursor-pointer"
            >
              <option value="All">All Roles</option>
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
              <option value="Alumni">Alumni</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-on-surface-variant block">Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant rounded-lg px-2.5 py-1.5 text-[12px] outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          {/* Export Format */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-on-surface-variant block">File Format</label>
            <div className="grid grid-cols-3 gap-1.5">
              {['CSV', 'PDF', 'JSON'].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setExportFormat(fmt)}
                  className={`py-1.5 rounded-lg text-[12px] font-bold border transition-all cursor-pointer ${
                    exportFormat === fmt
                      ? 'bg-primary border-primary text-on-primary shadow-sm'
                      : 'bg-surface border-outline-variant hover:bg-surface-container text-on-surface-variant'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Export CTA Button */}
          <button
            onClick={handleExport}
            disabled={exporting}
            className="w-full py-1.5 bg-primary text-on-primary rounded-lg text-[10px] font-bold hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-3"
          >
            {exporting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">download</span>
                Generate & Export
              </>
            )}
          </button>
        </div>

        {/* Right Side: Data Preview Card */}
        <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b border-outline-variant pb-1.5">
            <h3 className="text-[15px] font-bold text-on-surface">Data Preview</h3>
            <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-full">
              {filteredMembers.length} Matches Found
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[12px]">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-bold border-b border-outline-variant">
                  <th className="p-2">Name</th>
                  <th className="p-2">Role</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {filteredMembers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-[36px] mb-1.5 opacity-50">search_off</span>
                      <p className="text-[12px]">No records found matching config criteria.</p>
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="p-2 font-bold text-on-surface">{member.name}</td>
                      <td className="p-2 text-on-surface-variant font-medium">{member.role}</td>
                      <td className="p-2 text-on-surface-variant">{member.email}</td>
                      <td className="p-2">
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold leading-[14px] inline-block ${
                          member.status === 'Verified' 
                            ? 'bg-secondary/10 text-secondary'
                            : member.status === 'Pending' 
                            ? 'bg-tertiary-container/20 text-tertiary-container'
                            : 'bg-error-container text-on-error-container'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
