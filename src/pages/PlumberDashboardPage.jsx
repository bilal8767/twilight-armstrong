import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PlumberDashboardPage = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-primary p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl font-bold text-white">Plumber Dashboard</h1>
                    <button 
                        onClick={logout}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 backdrop-blur-xl">
                    <h2 className="text-xl font-bold text-white mb-2">Welcome, {user?.name || 'Partner'}!</h2>
                    <p className="text-secondary mb-6">Here you will see your assigned properties and QR code history.</p>
                    
                    <div className="p-4 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-xl">
                        This dashboard is currently under construction. Future updates will include customer management and document scanning.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlumberDashboardPage;
