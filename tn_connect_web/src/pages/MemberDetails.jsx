import React, { useState, useEffect } from 'react';
import { ChevronRight, School, Download, CheckCircle, XCircle, Blocks } from 'lucide-react';
import { getStorageData, saveStorageData, addAuditLog } from '../utils/mockData';
import { Link, useRouter } from '../components/Router';

export default function MemberDetails({ params }) {
  const { navigate } = useRouter();
  const [member, setMember] = useState(null);
  const [allMembers, setAllMembers] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const data = getStorageData();
    setAllMembers(data.members);
    setLogs(data.logs);
    
    const matched = data.members.find(m => m.id === params.id);
    if (matched) {
      setMember(matched);
    }
  }, [params.id]);

  if (!member) {
    return (
      <div className="text-center py-12 bg-surface border border-outline-variant rounded-xl shadow-sm space-y-4">
        <span className="material-symbols-outlined text-[48px] text-error">warning</span>
        <h3 className="text-[17px] font-bold text-on-surface">Member Not Found</h3>
        <p className="text-[12px] text-on-surface-variant">The member ID "{params.id}" could not be resolved.</p>
        <Link to="/members" className="inline-block bg-primary text-on-primary px-3 py-1.5 rounded-lg text-[12px] font-semibold">
          Back to Member List
        </Link>
      </div>
    );
  }

  const handleStatusUpdate = (newStatus) => {
    const updatedMembers = allMembers.map(m => {
      if (m.id === member.id) {
        return { ...m, status: newStatus };
      }
      return m;
    });

    const updatedLogs = addAuditLog(`Updated status of ${member.name} to ${newStatus}`);
    saveStorageData(updatedMembers, updatedLogs);
    setAllMembers(updatedMembers);
    setLogs(updatedLogs);
    setMember({ ...member, status: newStatus });
  };

  // Filter logs for this specific member
  const memberLogs = logs.filter(log => log.action.includes(member.name));

  const formatDate = (isoString) => {
    if (!isoString) return 'Recent';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-2" aria-label="member details">
      {/* Header & Back Button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-2">
        <div>
          <nav className="flex items-center gap-2 text-on-surface-variant text-[11px] font-semibold mb-2">
            <Link to="/members" className="hover:underline">Members</Link>
            <ChevronRight className="text-sm" size={16} aria-label="Breadcrumb separator"/>
            <span className="text-primary font-bold">Profile Detail</span>
          </nav>
          <h2 className="text-[22px] font-bold text-on-surface leading-tight">{member.name}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {member.status !== 'Suspended' ? (
            <button 
              onClick={() => handleStatusUpdate('Suspended')}
              className="px-4 py-2 bg-error text-on-error font-bold rounded-lg text-[11px] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Suspend Account
            </button>
          ) : (
            <button 
              onClick={() => handleStatusUpdate('Pending')}
              className="px-4 py-2 bg-primary text-on-primary font-bold rounded-lg text-[11px] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Restore to Pending
            </button>
          )}
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Profile Card Summary (col-span-4) */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col hover:border-primary transition-all">
          <div className="h-1 bg-primary w-full"></div>
          <div className="p-6 flex flex-col items-center text-center flex-grow">
            <div className="relative mb-4">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-surface-variant p-0.5 border-4 border-surface-container-low shadow-md flex items-center justify-center">
                {member.avatar ? (
                  <img alt={member.name} className="w-full h-full object-cover rounded-full" src={member.avatar} />
                ) : (
                  <span className="material-symbols-outlined text-[48px] text-on-surface-variant">person</span>
                )}
              </div>
              <span className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-surface-container-lowest ${
                member.status === 'Verified' ? 'bg-green-600' : member.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-600'
              }`} title="Online Now"></span>
            </div>

            <span className={`px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-widest mb-2 ${
              member.status === 'Verified' 
                ? 'bg-secondary-container text-on-secondary-container' 
                : member.status === 'Pending' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-error-container text-on-error-container'
            }`}>
              {member.status} {member.role}
            </span>

            <h3 className="text-[17px] font-bold text-on-surface leading-tight">{member.name}</h3>
            <p className="text-on-surface-variant text-[12px] mt-1">{member.email}</p>

            <div className="w-full space-y-3 pt-5 border-t border-outline-variant/60 mt-5 text-[12px] text-left">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">University:</span>
                <span className="text-on-surface font-bold">{member.school}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Member ID:</span>
                <span className="text-on-surface font-mono font-bold">{member.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">GPA Gauge:</span>
                <span className="text-primary font-bold">{member.gpa || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Details (col-span-8) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-6 hover:border-primary transition-all">
            <h4 className="font-bold text-[14px] text-on-surface mb-4 border-b border-outline-variant pb-2 flex items-center gap-2">
              <School size={16} aria-label="School"/>
              Academic Profile Detail
            </h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-surface-container-low p-3 rounded-xl text-center">
                <p className="text-[9px] text-on-surface-variant uppercase font-bold tracking-wider">Programme</p>
                <p className="text-[13px] font-bold text-primary mt-1 truncate" title={member.programme}>{member.programme}</p>
              </div>
              <div className="bg-surface-container-low p-3 rounded-xl text-center flex flex-col justify-between items-center">
                <p className="text-[9px] text-on-surface-variant uppercase font-bold tracking-wider">GPA</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-6 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="bg-secondary h-full" style={{ width: `${(parseFloat(member.gpa) / 4.0) * 100}%` }}></div>
                  </div>
                  <span className="text-[13px] font-bold text-primary">{member.gpa}</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-3 rounded-xl text-center">
                <p className="text-[9px] text-on-surface-variant uppercase font-bold tracking-wider">Credits Earned</p>
                <p className="text-[13px] font-bold text-primary mt-1">{member.creditsEarned || 0}</p>
              </div>
              <div className="bg-surface-container-low p-3 rounded-xl text-center">
                <p className="text-[9px] text-on-surface-variant uppercase font-bold tracking-wider">Registered</p>
                <p className="text-[13px] font-bold text-primary mt-1 truncate">{member.appliedTime}</p>
              </div>
            </div>
          </div>

          {/* Verification Document Download */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-6 hover:border-primary transition-all">
            <h4 className="font-bold text-[14px] text-on-surface mb-3 border-b border-outline-variant pb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">description</span>
              Verification Documents
            </h4>
            <div className="flex items-center justify-between bg-surface-container-low p-3 rounded-xl border border-outline-variant">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[28px] text-primary">description</span>
                <div>
                  <p className="text-[12px] font-bold text-on-surface">{member.documentName || 'student_id_card.pdf'}</p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">Uploaded during registration</p>
                </div>
              </div>
              <button 
                onClick={() => alert(`Simulating file download: ${member.documentName || 'student_id_card.pdf'}`)}
                className="px-3 py-1.5 border border-outline-variant hover:bg-surface-container-high transition-colors rounded-lg text-[11px] font-bold text-on-surface flex items-center gap-1 cursor-pointer"
              >
                <Download size={16} aria-label="Download"/>
                Download PDF
              </button>
            </div>
          </div>

          {/* Review Action Controls */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-6 hover:border-primary transition-all">
            <h4 className="font-bold text-[14px] text-on-surface mb-3 border-b border-outline-variant pb-2">Verification Controls</h4>
            <div className="flex flex-wrap gap-3 mt-4">
              {member.status === 'Pending' && (
                <>
                  <button
                    onClick={() => handleStatusUpdate('Verified')}
                    className="px-4 py-2 bg-secondary text-on-secondary rounded-lg text-[11px] font-bold hover:brightness-110 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    <CheckCircle size={16} aria-label="Approve"/>
                    Approve & Verify Member
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('Suspended')}
                    className="px-4 py-2 bg-error text-on-error rounded-lg text-[11px] font-bold hover:brightness-110 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    <XCircle size={16} aria-label="Decline"/>
                    Decline & Reject Profile
                  </button>
                </>
              )}
              {member.status === 'Verified' && (
                <button
                  onClick={() => handleStatusUpdate('Suspended')}
                  className="px-4 py-2 bg-error text-on-error rounded-lg text-[11px] font-bold hover:brightness-110 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                >
                  <Blocks size={16} aria-label="Suspend"/>
                  Suspend Member Account
                </button>
              )}
              {member.status === 'Suspended' && (
                <>
                  <button
                    onClick={() => handleStatusUpdate('Pending')}
                    className="px-4 py-2 bg-primary text-on-primary rounded-lg text-[11px] font-bold hover:brightness-110 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[16px]">restore</span>
                    Restore to Pending
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('Verified')}
                    className="px-4 py-2 bg-secondary text-on-secondary rounded-lg text-[11px] font-bold hover:brightness-110 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Verify Profile Directly
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Member Activity Timeline Logs (col-span-12) */}
        <div className="col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden hover:border-primary transition-all">
          <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
            <h4 className="font-bold text-[14px] text-on-surface uppercase tracking-wider">Recent Activity Logs</h4>
          </div>
          <div className="p-6 max-h-[300px] overflow-y-auto custom-scrollbar">
            {memberLogs.length === 0 ? (
              <div className="text-center py-6 text-on-surface-variant">
                <span className="material-symbols-outlined text-[32px] opacity-40 mb-1">history</span>
                <p className="text-[12px]">No recent audit logs for this member.</p>
              </div>
            ) : (
              <div className="space-y-4 relative">
                <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-outline-variant"></div>
                {memberLogs.map((log) => (
                  <div key={log.id} className="relative pl-8">
                    <div className="absolute left-0 top-1 w-6 h-6 bg-secondary text-on-secondary rounded-full flex items-center justify-center border-4 border-surface-container-lowest">
                      <span className="material-symbols-outlined text-[12px]">info</span>
                    </div>
                    <div className="flex justify-between items-start text-[12px]">
                      <div>
                        <p className="font-bold text-on-surface">{log.action}</p>
                        <p className="text-on-surface-variant text-[11px] mt-0.5">Admin: {log.actor} • IP: {log.ipAddress}</p>
                      </div>
                      <span className="text-[11px] text-outline-variant font-medium">{formatDate(log.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}