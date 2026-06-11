import React, { useState, useEffect } from 'react';
import { getStorageData, saveStorageData, addAuditLog } from '../utils/mockData';
import { Link } from '../components/Router';
import { Filter, TrendingUp, Search, CheckCircle, XCircle, Eye } from 'lucide-react';

export default function MemberManagement() {
  const [members, setMembers] = useState([]);
  const [logs, setLogs] = useState([]);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedProgramme, setSelectedProgramme] = useState('All');

  useEffect(() => {
    const data = getStorageData();
    setMembers(data.members);
    setLogs(data.logs);
  }, []);

  const handleStatusChange = (id, name, newStatus) => {
    const updatedMembers = members.map(m => {
      if (m.id === id) {
        return { ...m, status: newStatus };
      }
      return m;
    });

    const updatedLogs = addAuditLog(`Changed status of ${name} to ${newStatus}`);
    saveStorageData(updatedMembers, updatedLogs);
    setMembers(updatedMembers);
    setLogs(updatedLogs);
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.programme.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSchool = selectedSchool === 'All' || member.school === selectedSchool;
    const matchesStatus = selectedStatus === 'All' || member.status === selectedStatus;
    const matchesProgramme = selectedProgramme === 'All' || 
                             member.programme.toLowerCase().includes(selectedProgramme.toLowerCase());

    return matchesSearch && matchesSchool && matchesStatus && matchesProgramme;
  });

  return (
    <div className="space-y-2">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary uppercase tracking-tight">Member Management</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Manage university affiliations and verification status.</p>
        </div>
      </div>

      {/* Bento Filter & Stats Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
        {/* Filter Panel */}
        <div className="md:col-span-8 bg-surface-container-lowest border border-outline border-t-[4px] border-t-primary p-2 rounded-lg flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-primary font-bold text-[13px] tracking-wider uppercase">
            <Filter size={18} className="text-primary" aria-label="Filter"/>
            Quick Filters
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Institution Filter */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Institution</label>
              <select 
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="w-full border-outline border rounded-lg p-2 text-[12px] bg-white focus:border-primary focus:ring-0 outline-none"
              >
                <option value="All">All Institutions</option>
                <option value="University of Ghana">University of Ghana</option>
                <option value="KNUST">KNUST</option>
                <option value="UCC">UCC</option>
              </select>
            </div>
            {/* Status Filter */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Status</label>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full border-outline border rounded-lg p-2 text-[12px] bg-white focus:border-primary focus:ring-0 outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Verified">Verified</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
            {/* Program Filter */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Program</label>
              <select 
                value={selectedProgramme}
                onChange={(e) => setSelectedProgramme(e.target.value)}
                className="w-full border-outline border rounded-lg p-2 text-[12px] bg-white focus:border-primary focus:ring-0 outline-none"
              >
                <option value="All">All Programs</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Business">Business</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="md:col-span-4 bg-primary text-on-primary border border-outline p-2 rounded-lg flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold opacity-80 uppercase tracking-widest">Total Members</div>
            <div className="text-[32px] font-bold mt-1">{12470 + members.length}</div>
          </div>
          <div className="flex items-center gap-2 mt-4 text-[12px]">
            <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 text-[10px] font-bold rounded-full">
              +12% This Month
            </span>
            <TrendingUp size={16} className="text-primary" aria-label="Trending Up"/>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-surface-container-lowest p-2 rounded-lg border border-outline flex items-center">
        <span className="material-symbols-outlined text-on-surface-variant mr-2 text-[18px]">search</span>
        <input 
          type="text"
          placeholder="Search members by name, email, or details..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-none focus:ring-0 text-[12px] w-full outline-none"
        />
      </div>

      {/* Data Table Card */}
      <div className="bg-surface-container-lowest border border-outline rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high text-primary border-b border-outline">
                <th className="p-3 font-bold uppercase text-[11px] tracking-wider">Name</th>
                <th className="p-3 font-bold uppercase text-[11px] tracking-wider">School</th>
                <th className="p-3 font-bold uppercase text-[11px] tracking-wider">Program</th>
                <th className="p-3 font-bold uppercase text-[11px] tracking-wider text-center">Status</th>
                <th className="p-3 font-bold uppercase text-[11px] tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-on-surface-variant">
                    <Search size={18} className="text-primary" aria-label="Search"/>
                    <p className="text-[12px]">No members match your filter criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold rounded-lg border border-outline-variant flex-shrink-0">
                          {member.avatar ? (
                            <img alt={member.name} className="w-full h-full object-cover rounded-lg" src={member.avatar} />
                          ) : (
                            member.name.substring(0, 2).toUpperCase()
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-on-surface text-[12px]">{member.name}</div>
                          <div className="text-[10px] text-on-surface-variant">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-[12px] text-on-surface font-medium">{member.school}</td>
                    <td className="p-3 text-[12px] text-on-surface font-medium">
                      <div>{member.programme}</div>
                      <div className="text-[10px] text-on-surface-variant mt-0.5">{member.role}</div>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                        member.status === 'Verified' 
                          ? 'bg-[#006400]/10 text-[#006400] border-[#006400]/20' 
                          : member.status === 'Pending' 
                          ? 'bg-yellow-100 text-yellow-800 border-yellow-200' 
                          : 'bg-error-container text-on-error-container border-outline-variant'
                      }`}>
                        {member.status === 'Verified' ? <CheckCircle size={13} className="text-primary mr-1" aria-label="Verified"/> : member.status === 'Pending' ? <XCircle size={13} className="text-primary mr-1" aria-label="Pending"/> : <XCircle size={13} className="text-primary mr-1" aria-label="Suspended"/>}
                        {member.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Link 
                          to={`/member/${member.id}`}
                          className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded transition-all"
                          title="View Details"
                        >
                          <Eye size={18} className="text-on-surface-variant" aria-label="View Details"/>
                        </Link>
                        <select
                          value={member.status}
                          onChange={(e) => handleStatusChange(member.id, member.name, e.target.value)}
                          className="bg-surface-container border border-outline-variant rounded-lg px-2 py-1 text-[10px] font-semibold outline-none cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Verified">Verify</option>
                          <option value="Suspended">Suspend</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
