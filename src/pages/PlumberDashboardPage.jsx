import React from 'react';
import { LogOut, Wrench, MapPin, CheckCircle, FileText, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PlumberDashboardPage = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-20 md:pb-8">
            {/* Header / Nav */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/30 rounded-xl flex items-center justify-center text-white">
                            <Wrench size={20} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 leading-tight">Partner Portal</h1>
                            <p className="text-xs text-slate-500 font-medium">Verified Plumber</p>
                        </div>
                    </div>
                    <button 
                        onClick={logout}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl shadow-orange-500/20 mb-8 relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <h2 className="text-2xl font-bold text-white mb-1 relative z-10">Welcome, {user?.name || 'Partner'}!</h2>
                    <p className="text-orange-100 font-medium relative z-10">You have 3 new installations assigned today.</p>
                </div>

                {/* KPI/Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
                        <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-2">
                            <MapPin size={24} />
                        </div>
                        <h3 className="text-3xl font-black text-slate-800">12</h3>
                        <p className="text-sm font-medium text-slate-500">Pending Sites</p>
                    </div>
                    
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
                        <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-2">
                            <CheckCircle size={24} />
                        </div>
                        <h3 className="text-3xl font-black text-slate-800">45</h3>
                        <p className="text-sm font-medium text-slate-500">Completed Jobs</p>
                    </div>
                </div>

                {/* Section Title */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-800">Recent Assignments</h3>
                    <button className="text-sm font-bold text-orange-500 hover:text-orange-600">View All</button>
                </div>

                {/* Job Cards */}
                <div className="space-y-4">
                    {[
                        { id: 'JOB-1049', name: 'John Peterson', address: '123 Maple Street', time: 'Today, 14:00' },
                        { id: 'JOB-1050', name: 'Sarah Connor', address: '456 Tech Avenue', time: 'Tomorrow, 09:00' },
                        { id: 'JOB-1051', name: 'James Doe', address: '789 Oak Boulevard', time: 'Tomorrow, 11:30' }
                    ].map((job, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center">
                                    <FileText size={20} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">{job.name} <span className="font-normal text-slate-400 text-xs ml-2">{job.id}</span></h4>
                                    <p className="text-xs text-slate-500 mt-0.5">{job.address}</p>
                                    <p className="text-xs font-semibold text-orange-500 mt-1">{job.time}</p>
                                </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-orange-50 transition-colors">
                                <ChevronRight size={16} className="text-slate-400 group-hover:text-orange-500" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action Button (Sticky on mobile bottom) */}
                <div className="fixed sm:static bottom-0 left-0 w-full sm:w-auto p-4 sm:p-0 sm:mt-8 bg-gradient-to-t from-white via-white to-transparent sm:bg-none z-10">
                    <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                        <Wrench size={20} />
                        Scan Installation QR
                    </button>
                </div>
            </main>
        </div>
    );
};

export default PlumberDashboardPage;
