import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const DashboardLayout = () => {
  const { user } = useAuth();

  // Example role-based sidebar links
  const sidebarLinks = {
    buyer: [
      { to: '/dashboard', label: 'My Orders' },
      { to: '/dashboard/profile', label: 'Profile' },
    ],
    seller: [
      { to: '/dashboard', label: 'My Products' },
      { to: '/dashboard/orders', label: 'Orders' },
    ],
    admin: [
      { to: '/dashboard', label: 'Admin Home' },
      { to: '/dashboard/users', label: 'Manage Users' },
    ],
  };

  // Default to buyer if no user or role
  const links = sidebarLinks[user?.role] || sidebarLinks['buyer'];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <nav>
          <ul>
            {links.map(link => (
              <li key={link.to} className="mb-4">
                <Link to={link.to} className="hover:underline">{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 bg-white p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout; 