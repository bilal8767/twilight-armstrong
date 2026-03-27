import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, List, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-secondary border-r border-white/5 flex flex-col fixed h-full">
                <div className="p-6 border-b border-white/5">
                    <h1 className="text-xl font-bold text-accent-primary">ModernApp</h1>
                </div>

                <nav className="flex-grow p-4 flex flex-col gap-2">
                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-md transition-colors ${isActive ? 'bg-accent-primary text-white' : 'text-secondary hover:bg-white/5 hover:text-white'}`
                        }
                    >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/dashboard/modules"
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-md transition-colors ${isActive ? 'bg-accent-primary text-white' : 'text-secondary hover:bg-white/5 hover:text-white'}`
                        }
                    >
                        <List size={20} />
                        <span>Modules</span>
                    </NavLink>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <span className="text-sm font-medium">{user?.email}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 p-2 rounded-md border border-white/10 hover:bg-white/5 transition-colors text-sm"
                    >
                        <LogOut size={16} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow ml-64 p-8 bg-primary min-h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
