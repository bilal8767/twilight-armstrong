import React, { useState, useEffect } from 'react';
import { FileText, Download, Home, Plus, Loader2, LogOut, FileSearch } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CustomerDashboardPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.email) {
            fetchSubmissions(user.email);
        } else {
            setLoading(false);
        }
    }, [user]);

    const fetchSubmissions = async (email) => {
        try {
            const response = await fetch(`/api/submissions/user/${encodeURIComponent(email)}`);
            if (response.ok) {
                const data = await response.json();
                setSubmissions(data);
            } else {
                console.error("Failed to fetch. Checking fallback...");
                const fallbackResponse = await fetch(`http://localhost:3001/api/submissions/user/${encodeURIComponent(email)}`);
                if(fallbackResponse.ok) {
                    const data = await fallbackResponse.json();
                    setSubmissions(data);
                }
            }
        } catch (error) {
            console.error('Error fetching submissions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <div className="header-content">
                    <div className="header-brand">
                        <div className="brand-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
                            <Home size={20} />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#0f172a', lineHeight: '1.2' }}>My Dashboard</h1>
                            <p style={{ fontSize: '0.75rem', fontWeight: '500', color: '#64748b' }}>Customer Portal</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="icon-btn" title="Log Out">
                        <LogOut size={18} />
                    </button>
                </div>
            </header>

            <main className="dashboard-main">
                <div className="welcome-widget" style={{ background: 'linear-gradient(to right, #3b82f6, #1d4ed8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Welcome, {user?.name || 'Customer'}!</h2>
                        <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: '500' }}>Manage your property documents securely.</p>
                    </div>
                    <Link to="/wizard" className="icon-btn" style={{ background: 'white', color: '#2563eb', textDecoration: 'none', width: 'auto', padding: '0.5rem 1rem', borderRadius: '2rem', display: 'flex', gap: '0.5rem', fontWeight: 'bold', fontSize: '0.875rem' }}>
                        <Plus size={16} /> New Property
                    </Link>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#0f172a' }}>My Uploaded Documents</h3>
                </div>

                <div className="job-list">
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                            <Loader2 className="animate-spin" style={{ margin: '0 auto 1rem' }} size={32} />
                            <p>Loading your documents...</p>
                        </div>
                    ) : submissions.length === 0 ? (
                        <div style={{ background: 'white', border: '1px dashed #cbd5e1', borderRadius: '1rem', padding: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '4rem', height: '4rem', backgroundColor: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                <FileSearch size={32} color="#94a3b8" />
                            </div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '0.5rem' }}>No documents found</h3>
                            <p style={{ fontSize: '0.875rem', color: '#64748b', maxWidth: '250px', marginBottom: '1.5rem' }}>You haven't uploaded any documents yet, or they are restricted via the Database.</p>
                            <Link to="/wizard" className="premium-btn" style={{ width: 'auto', padding: '0.75rem 1.5rem' }}>Start First Upload</Link>
                        </div>
                    ) : (
                        submissions.map((sub, idx) => (
                            <div key={idx} className="job-card">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '3rem', height: '3rem', backgroundColor: '#eff6ff', borderRadius: '0.5rem', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Home size={20} color="#3b82f6" />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#0f172a' }}>
                                            {sub.propertyName || 'Property'} 
                                            <span style={{ fontWeight: '600', color: '#3b82f6', background: '#eff6ff', padding: '0.1rem 0.4rem', borderRadius: '1rem', fontSize: '0.65rem', marginLeft: '0.5rem', textTransform: 'uppercase' }}>{sub.propertyType || 'N/A'}</span>
                                        </h4>
                                        <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.125rem' }}>{sub.address || 'No Address'}</p>
                                        <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.25rem' }}>{new Date(sub.timestamp).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {sub.energieausweisPath && <a href={sub.energieausweisPath} target="_blank" rel="noreferrer" title="Energieausweis" className="icon-btn" style={{ color: '#3b82f6', background: '#eff6ff' }}><FileText size={16} /></a>}
                                    {sub.heizungsbauerPath && <a href={sub.heizungsbauerPath} target="_blank" rel="noreferrer" title="Heizungsbauer" className="icon-btn" style={{ color: '#f97316', background: '#fff7ed' }}><Download size={16} /></a>}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default CustomerDashboardPage;
