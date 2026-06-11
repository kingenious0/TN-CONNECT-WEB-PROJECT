import React, { createContext, useContext, useState, useEffect } from 'react';
import AdminLayout from '../pages/admin/AdminLayout';
import AdminDashboard from '../pages/AdminDashboard';
import AuditLogs from '../pages/AuditLogs';
import MemberDetails from '../pages/MemberDetails';
import MemberManagement from '../pages/MemberManagement';

const RouterContext = createContext(null);

export function RouterProvider({ children }) {
  const [path, setPath] = useState(window.location.hash.replace('#', '') || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setPath(window.location.hash.replace('#', '') || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (to) => {
    window.location.hash = to;
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

export function Link({ to, children, className, ...props }) {
  const { navigate } = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={`#${to}`} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}

export function Route({ path: routePath, element }) {
  const { path: currentPath } = useRouter();

  if (routePath === '/' && currentPath === '/') {
    return element;
  }

  const routeParts = routePath.split('/').filter(Boolean);
  const currentParts = currentPath.split('/').filter(Boolean);

  if (routeParts.length !== currentParts.length) {
    return null;
  }

  const params = {};
  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(':')) {
      params[routeParts[i].substring(1)] = currentParts[i];
    } else if (routeParts[i] !== currentParts[i]) {
      return null;
    }
  }

  // Admin routes handling with AdminLayout wrapper
  const adminRoutes = {
    '/admin': <AdminLayout><AdminDashboard /></AdminLayout>,
    '/admin/dashboard': <AdminLayout><AdminDashboard /></AdminLayout>,
    '/admin/logs': <AdminLayout><AuditLogs /></AdminLayout>,
    '/admin/member/:id': <AdminLayout><MemberDetails /></AdminLayout>,
    '/admin/members': <AdminLayout><MemberManagement /></AdminLayout>,
  };

  if (adminRoutes[routePath]) {
    return React.cloneElement(adminRoutes[routePath], { params });
  }

  return React.cloneElement(element, { params });
}
