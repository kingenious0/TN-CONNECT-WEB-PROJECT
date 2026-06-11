import React, { useState, useEffect } from 'react';
import { getStorageData } from '../utils/mockData';
import { Users, UserCheck, UserX, Clock, School, GraduationCap, TrendingUp, Activity } from 'lucide-react';


export default function AdminDashboard() {
  const [members, setMembers] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const data = getStorageData();
    setMembers(data.members);
    setLogs(data.logs);
  }, []);

  const verified = members.filter(m => m.status === 'Verified').length;
  const pending = members.filter(m => m.status === 'Pending').length;
  const suspended = members.filter(m => m.status === 'Suspended').length;

  const stats = [
    { label: 'Total Members', value: members.length, icon: Users, color: 'bg-primary/10 text-primary' },
    { label: 'Verified', value: verified, icon: UserCheck, color: 'bg-secondary/10 text-secondary' },
    { label: 'Pending Review', value: pending, icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
    { label: 'Suspended', value: suspended, icon: UserX, color: 'bg-error-container/30 text-on-error-container' },
  ];

  const roleCounts = ['Student', 'Faculty', 'Alumni'].map(role => ({
    role,
    count: members.filter(m => m.role === role).length,
    icon: role === 'Student' ? GraduationCap : role === 'Faculty' ? School : TrendingUp,
  }));

  const recentLogs = logs.slice(-5).reverse();

  return (
    <div className="space-y-gutter">
      <div>
        <h2 className="text-[22px] font-bold leading-[28px] text-on-surface">Dashboard</h2>
        <p className="text-[11px] leading-[16px] text-on-surface-variant">Overview of the member directory system.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm hover:border-primary transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon size={18} />
              </span>
            </div>
            <p className="text-[24px] font-bold text-on-surface leading-none">{stat.value}</p>
            <p className="text-[11px] text-on-surface-variant font-medium mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm hover:border-primary transition-all">
          <h3 className="text-[14px] font-bold text-on-surface mb-3 border-b border-outline-variant pb-2 flex items-center gap-2">
            <Users size={16} />
            Members by Role
          </h3>
          <div className="space-y-3">
            {roleCounts.map(({ role, count, icon: Icon }) => (
              <div key={role} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon size={16} className="text-on-surface-variant" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${members.length ? (count / members.length) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-[12px] font-bold text-on-surface min-w-[2ch] text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm hover:border-primary transition-all">
          <h3 className="text-[14px] font-bold text-on-surface mb-3 border-b border-outline-variant pb-2 flex items-center gap-2">
            <Activity size={16} />
            Recent Activity
          </h3>
          {recentLogs.length === 0 ? (
            <p className="text-[12px] text-on-surface-variant text-center py-6">No recent activity.</p>
          ) : (
            <div className="space-y-2">
              {recentLogs.map((log) => (
                <div key={log.id} className="text-[11px] border-b border-outline-variant/50 pb-2 last:border-0">
                  <p className="font-bold text-on-surface truncate">{log.action}</p>
                  <p className="text-on-surface-variant truncate">{log.actor} &middot; {new Date(log.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
