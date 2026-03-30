import React from 'react';
import { LogOut, Wrench, MapPin, CheckCircle, FileText, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PlumberDashboardPage = () => {
    const { user, logout } = useAuth();

    return (
        <div className="dashboard-page">
            {/* Header / Nav */}
            <header className="dashboard-header">
                <div className="header-content">
                    <div className="header-brand">
                        <div className="brand-icon">
                            <Wrench size={20} />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#0f172a', lineHeight: '1.2' }}>Partner Portal</h1>
                            <p style={{ fontSize: '0.75rem', fontWeight: '500', color: '#64748b' }}>Verified Plumber</p>
                        </div>
                    </div>
                    <button onClick={logout} className="icon-btn">
                        <LogOut size={18} />
                    </button>
                </div>
            </header>

            <main className="dashboard-main">
                
                {/* Welcome Card */}
                <div className="welcome-widget">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Welcome, {user?.name || 'Partner'}!</h2>
                    <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: '500' }}>You have 3 new installations assigned today.</p>
                </div>

                {/* KPI/Stats Grid */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
                            <MapPin size={24} />
                        </div>
                        <h3 style={{ fontSize: '2rem', fontWeight: '900', color: '#0f172a' }}>12</h3>
                        <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#64748b' }}>Pending Sites</p>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: '#f0fdf4', color: '#22c55e' }}>
                            <CheckCircle size={24} />
                        </div>
                        <h3 style={{ fontSize: '2rem', fontWeight: '900', color: '#0f172a' }}>45</h3>
                        <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#64748b' }}>Completed Jobs</p>
                    </div>
                </div>

                {/* Section Title */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#0f172a' }}>Recent Assignments</h3>
                    <button style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#f97316', background: 'none', border: 'none', cursor: 'pointer' }}>View All</button>
                </div>

                {/* Job Cards */}
                <div className="job-list">
                    {[
                        { id: 'JOB-1049', name: 'John Peterson', address: '123 Maple Street', time: 'Today, 14:00' },
                        { id: 'JOB-1050', name: 'Sarah Connor', address: '456 Tech Avenue', time: 'Tomorrow, 09:00' },
                        { id: 'JOB-1051', name: 'James Doe', address: '789 Oak Boulevard', time: 'Tomorrow, 11:30' }
                    ].map((job, idx) => (
                        <div key={idx} className="job-card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '3rem', height: '3rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <FileText size={20} color="#94a3b8" />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#0f172a' }}>
                                        {job.name} <span style={{ fontWeight: 'normal', color: '#94a3b8', fontSize: '0.75rem', marginLeft: '0.5rem' }}>{job.id}</span>
                                    </h4>
                                    <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.125rem' }}>{job.address}</p>
                                    <p style={{ fontSize: '0.75rem', fontWeight: '600', color: '#f97316', marginTop: '0.25rem' }}>{job.time}</p>
                                </div>
                            </div>
                            <div className="icon-btn">
                                <ChevronRight size={16} />
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Action Button (Sticky) */}
            <div className="fab-container">
                <button className="fab-btn">
                    <Wrench size={20} />
                    Scan Installation QR
                </button>
            </div>
        </div>
    );
};

export default PlumberDashboardPage;
