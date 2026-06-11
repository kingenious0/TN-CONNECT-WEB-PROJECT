import React, { useState, useEffect } from 'react';
import { getStorageData, saveStorageData, addAuditLog } from '../utils/mockData';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [members, setMembers] = useState([]);
  
  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActor, setSelectedActor] = useState('All');
  const [selectedActionType, setSelectedActionType] = useState('All');

  useEffect(() => {
    const data = getStorageData();
    setLogs(data.logs);
    setMembers(data.members);
  }, []);

  const handleClearLogs = () => {
    if (window.confirm("Are you sure you want to clear the audit logs? This action is irreversible.")) {
      const clearedLogs = [
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actor: "Alex Rivera",
          action: "Cleared audit log database history",
          ipAddress: "192.168.1.2",
          browser: "Chrome (Linux)"
        }
      ];
      saveStorageData(members, clearedLogs);
      setLogs(clearedLogs);
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.browser.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesActor = selectedActor === 'All' || log.actor === selectedActor;

    let matchesActionType = true;
    if (selectedActionType !== 'All') {
      if (selectedActionType === 'Member Verified') {
        matchesActionType = log.action.toLowerCase().includes('approved') || log.action.toLowerCase().includes('verified');
      } else if (selectedActionType === 'Profile Edited') {
        matchesActionType = log.action.toLowerCase().includes('profile') || log.action.toLowerCase().includes('status');
      } else if (selectedActionType === 'User Deleted') {
        matchesActionType = log.action.toLowerCase().includes('declined') || log.action.toLowerCase().includes('suspended') || log.action.toLowerCase().includes('deleted');
      }
    }

    return matchesSearch && matchesActor && matchesActionType;
  });

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActionBadge = (actionText) => {
    const text = actionText.toLowerCase();
    if (text.includes('approved') || text.includes('verified')) {
      return (
        <span className="inline-flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-[11px] font-bold">
          <span className="material-symbols-outlined text-[14px]">verified</span>
          Member Verified
        </span>
      );
    } else if (text.includes('profile') || text.includes('status')) {
      return (
        <span className="inline-flex items-center gap-1 bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full text-[11px] font-bold">
          <span className="material-symbols-outlined text-[14px]">edit_note</span>
          Profile Edited
        </span>
      );
    } else if (text.includes('declined') || text.includes('suspended') || text.includes('deleted')) {
      return (
        <span className="inline-flex items-center gap-1 bg-error-container text-on-error-container px-3 py-1 rounded-full text-[11px] font-bold">
          <span className="material-symbols-outlined text-[14px]">delete_forever</span>
          User Deleted
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 bg-surface-container-highest text-on-surface px-3 py-1 rounded-full text-[11px] font-bold">
          <span className="material-symbols-outlined text-[14px]">info</span>
          System Reset
        </span>
      );
    }
  };

  return (
    <div className="space-y-gutter">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-[22px] font-bold leading-[28px] text-on-surface">Audit Logs</h2>
          <p className="text-[12px] leading-[16px] text-on-surface-variant">Trace the timeline of system operations and administrative approvals.</p>
        </div>
        <button
          onClick={handleClearLogs}
          className="px-3 py-1.5 border border-error text-error hover:bg-error/5 rounded-lg text-[12px] font-bold leading-[16px] transition-all flex items-center gap-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">delete</span>
          Clear History
        </button>
      </div>

      {/* Filters Bar */}
      <section className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm border-t-4 border-t-primary">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search input field */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Search</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
                <input 
                  type="text"
                  placeholder="Search log descriptions, IP..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-[12px] focus:border-primary focus:ring-0 outline-none"
                />
              </div>
            </div>
            {/* Admin Filter */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Administrator</label>
              <select 
                value={selectedActor}
                onChange={(e) => setSelectedActor(e.target.value)}
                className="w-full bg-white border border-outline-variant rounded-lg p-2 text-[12px] focus:border-primary focus:ring-0 outline-none"
              >
                <option value="All">All Administrators</option>
                <option value="Alex Rivera">Alex Rivera</option>
                <option value="Kwame Mensah">Kwame Mensah</option>
                <option value="Abena Appiah">Abena Appiah</option>
                <option value="Ekow Blankson">Ekow Blankson</option>
              </select>
            </div>
            {/* Action Type */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Action Type</label>
              <select 
                value={selectedActionType}
                onChange={(e) => setSelectedActionType(e.target.value)}
                className="w-full bg-white border border-outline-variant rounded-lg p-2 text-[12px] focus:border-primary focus:ring-0 outline-none"
              >
                <option value="All">All Actions</option>
                <option value="Member Verified">Member Verified</option>
                <option value="Profile Edited">Profile Edited</option>
                <option value="User Deleted">User Deleted</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => { setSelectedActor('All'); setSelectedActionType('All'); setSearchTerm(''); }}
              className="text-on-surface-variant hover:text-primary px-4 py-2 rounded-lg text-[11px] font-bold transition-all border border-outline-variant cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* Audit Log Table */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm border-t-4 border-t-primary">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high border-b border-outline-variant">
                <th className="px-6 py-4 font-bold text-[11px] text-on-surface-variant uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-4 font-bold text-[11px] text-on-surface-variant uppercase tracking-wider">Administrator</th>
                <th className="px-6 py-4 font-bold text-[11px] text-on-surface-variant uppercase tracking-wider">Action Type</th>
                <th className="px-6 py-4 font-bold text-[11px] text-on-surface-variant uppercase tracking-wider">Event details</th>
                <th className="px-6 py-4 font-bold text-[11px] text-on-surface-variant uppercase tracking-wider">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-[36px] mb-2 opacity-50">receipt_long</span>
                    <p className="text-[12px]">No matching log records found.</p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-surface-container-low transition-colors group text-[12px]">
                    <td className="px-6 py-4 font-medium text-on-surface-variant">{formatDate(log.timestamp)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[11px]">
                          {log.actor.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="font-bold text-on-surface">{log.actor}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getActionBadge(log.action)}
                    </td>
                    <td className="px-6 py-4 text-on-surface font-medium">
                      <div className="flex flex-col">
                        <span>{log.action}</span>
                        <span className="text-[10px] text-on-surface-variant mt-0.5 font-normal">Browser: {log.browser}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-[11px] text-on-surface-variant">{log.ipAddress}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Export Report Actions and Security Lock widgets */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-md mt-6">
        <div className="md:col-span-2 bg-primary-container text-white p-6 rounded-xl flex items-center justify-between relative overflow-hidden group">
          <div className="z-10">
            <h3 className="text-[17px] font-bold mb-2">Generate Report</h3>
            <p className="text-[12px] opacity-90 max-w-sm">Download detailed audit statistics for the current month in PDF or CSV format for institutional filing.</p>
            <div className="mt-4 flex gap-2">
              <button 
                onClick={() => alert('Simulating PDF Export...')}
                className="bg-white text-primary px-4 py-2 rounded-lg text-[11px] font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-md"
              >
                Export as PDF
              </button>
              <button 
                onClick={() => alert('Simulating CSV Export...')}
                className="border border-white/40 hover:border-white text-white px-4 py-2 rounded-lg text-[11px] font-bold active:scale-95 transition-all cursor-pointer"
              >
                CSV Download
              </button>
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
            <span className="material-symbols-outlined text-[150px]">assessment</span>
          </div>
        </div>

        <div className="bg-white border-4 border-secondary p-6 rounded-xl flex flex-col justify-center items-center text-center shadow-lg">
          <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-[24px]">shield</span>
          </div>
          <h3 className="font-bold text-[14px] text-secondary uppercase mb-1">Integrity Lock</h3>
          <p className="text-[11px] text-on-surface-variant">All logs are cryptographically hashed and immutable once written to the system registry.</p>
        </div>
      </section>
    </div>
  );
}
