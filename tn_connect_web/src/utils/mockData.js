const INITIAL_MEMBERS = [
  {
    id: "felix-anderson",
    name: "Felix Anderson",
    role: "Student",
    email: "felix.anderson@university.edu",
    school: "Engineering & IT",
    programme: "BSc. Computer Science",
    status: "Pending",
    appliedTime: "14 minutes ago",
    appliedDate: "2026-06-09T06:40:00Z",
    gpa: "3.85",
    creditsEarned: "102 / 120",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZRmYN3ScicIwhToQoEhLKWHZKw6iXx9Px4Rskqbs5dldYGdyrUz9_JdPqzW3RMzgb643eCcNOs1ZTqch533p3HbC_KoN3W8VHVW2CWBcEsl_5ebJuDIzE7gAhHwp4xDJyTsNJ1OvG1pXZFTTShyZeU-ouv6SD2yxmZQopr66AxZcfJyAOSBIub6VS1PdgaKsxlftkUEUaDbprtVQcM8oHGcdy7wOJviLzgRTajkcCH5DIasc-L4luFS6CFLq1tfsboltzh2imEpBH",
    documentName: "Student_ID_Felix.pdf"
  },
  {
    id: "maya-sterling",
    name: "Maya Sterling",
    role: "Faculty",
    email: "maya.sterling@university.edu",
    school: "Sciences",
    programme: "MSc. Chemistry Instructor",
    status: "Verified",
    appliedTime: "1 hour ago",
    appliedDate: "2026-06-09T05:54:00Z",
    gpa: "N/A",
    creditsEarned: "N/A",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1KK3QzC7vZy_aQYjQZ43fxovdTeqXKBiHATgOV4tKK8HJCUEYt_vLhh7EFWON4IVz-58t1yskiSJFMGN2I59sVo9stHICyvGevP-vpNIeoLAq-yfc7XKq6HnZhZE0SFkmk2r48bziFy-bKYaGCrKLesAg2tr9MqgapwFRCTdp5IHefEOj6fQACkVu3ul55wwM1GrX5PSTxHOSRujk3f35eOoS9wfxtFIW6hHQowmIDpIjhLoWpicXulRYptW1qBWS_IJiKb7pE73b",
    documentName: "Faculty_Contract_Maya.pdf"
  },
  {
    id: "julian-thorne",
    name: "Julian Thorne",
    role: "Alumni",
    email: "julian.thorne@alumni.edu",
    school: "Business School",
    programme: "MBA Finance Graduate",
    status: "Pending",
    appliedTime: "3 hours ago",
    appliedDate: "2026-06-09T03:54:00Z",
    gpa: "3.91",
    creditsEarned: "120 / 120",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0Z-X0htPG581qO5wPjgntDlXgnWBtLUeC5GHcp7Y6wt7961GPsCmFDsSuigxAvIQ-2xcoeKHBbffgiFEqOKkBW3cwnagb_B7s2ln9yhjqPBtxy821t8CNZ5AIi0-a30-fShDQDaBvHsVeTHdka0PaoDZlHklsAn5eqryoz3fLrMq8wI-14tyLl22A2b32VmExZLWIjt12gIcnyhN84wAxfPjtACbqnJ8oK_VmmrOYphmnxEeCZLJz8CV88pm0rf2XlSm8g-tR_aFn",
    documentName: "Degree_Certificate_Julian.pdf"
  },
  {
    id: "marcia-owusu",
    name: "Marcia Owusu",
    role: "Student",
    email: "marcia.owusu@student.edu",
    school: "Engineering & IT",
    programme: "BSc. Electrical Engineering",
    status: "Verified",
    appliedTime: "1 day ago",
    appliedDate: "2026-06-08T07:54:00Z",
    gpa: "3.72",
    creditsEarned: "72 / 120",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDow3fF16wYb1vnTJFBiTn72bazZRnyxduOY3YmNmj12DAElNr2NUqpH7wpcVyPhM8uU8gGew8YuHlblTzA3PoKxaWkpiToA6BSJ7rm4uHPmOjkG5knKghOYhb9rvG63iOgFcnF-tmBwzKGHlOTXG-zRc65Ymjae0o-Lid4EPhbJXiFu2wIOqDqSIzIqee1ou-MvWWJkQwipNSKAHxrz2tgl1lCHXmjGC5-Q8IjIfI8i4CqQyX4wbYHXjsUbBDGWqVrvY_TVBvBlM52",
    documentName: "Student_ID_Marcia.pdf"
  },
  {
    id: "kwame-mensah",
    name: "Kwame Mensah",
    role: "Student",
    email: "kwame.mensah@university.edu",
    school: "Sciences",
    programme: "BSc. Mathematics",
    status: "Suspended",
    appliedTime: "2 days ago",
    appliedDate: "2026-06-07T07:54:00Z",
    gpa: "2.98",
    creditsEarned: "30 / 120",
    avatar: "",
    documentName: "Student_ID_Kwame.pdf"
  }
];

const INITIAL_LOGS = [
  {
    id: "log-1",
    timestamp: "2026-06-09T06:40:00Z",
    actor: "Felix Anderson",
    action: "Submitted registration request for approval",
    ipAddress: "192.168.1.14",
    browser: "Chrome (Linux)"
  },
  {
    id: "log-2",
    timestamp: "2026-06-09T05:54:00Z",
    actor: "Alex Rivera",
    action: "Approved & verified Faculty profile of Maya Sterling",
    ipAddress: "192.168.1.2",
    browser: "Chrome (macOS)"
  },
  {
    id: "log-3",
    timestamp: "2026-06-09T03:54:00Z",
    actor: "Julian Thorne",
    action: "Submitted registration request for approval",
    ipAddress: "197.220.12.8",
    browser: "Safari (iOS)"
  },
  {
    id: "log-4",
    timestamp: "2026-06-08T09:12:00Z",
    actor: "Alex Rivera",
    action: "Suspended member profile of Kwame Mensah (Reason: Code of Conduct violation)",
    ipAddress: "192.168.1.2",
    browser: "Chrome (macOS)"
  }
];

export function getStorageData() {
  const members = localStorage.getItem('tn_members');
  const logs = localStorage.getItem('tn_logs');

  if (!members) {
    localStorage.setItem('tn_members', JSON.stringify(INITIAL_MEMBERS));
  }
  if (!logs) {
    localStorage.setItem('tn_logs', JSON.stringify(INITIAL_LOGS));
  }

  return {
    members: members ? JSON.parse(members) : INITIAL_MEMBERS,
    logs: logs ? JSON.parse(logs) : INITIAL_LOGS
  };
}

export function saveStorageData(members, logs) {
  localStorage.setItem('tn_members', JSON.stringify(members));
  localStorage.setItem('tn_logs', JSON.stringify(logs));
}

export function addAuditLog(action, actor = "Alex Rivera") {
  const { members, logs } = getStorageData();
  const newLog = {
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    actor,
    action,
    ipAddress: "192.168.1.2",
    browser: "Chrome (Linux)"
  };
  const updatedLogs = [newLog, ...logs];
  saveStorageData(members, updatedLogs);
  return updatedLogs;
}
