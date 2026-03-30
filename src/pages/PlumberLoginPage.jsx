import React, { useState } from 'react';
import { ArrowLeft, UserCircle2, KeyRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PlumberLoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            const res = login(formData.email, formData.password);
            if (res.success) {
                if (res.isAdmin) {
                    setError('Administrators must use the dedicated Admin Portal to log in.');
                    logout();
                } else if (res.role === 'plumber') {
                    navigate('/plumber-dashboard');
                } else {
                    setError('Invalid role. Please sign in via the Customer portal.');
                    logout();
                }
            } else {
                setError(res.message || 'Failed to login');
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="auth-wrapper">
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 20 }}>
                <Link to="/landing" style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                    <ArrowLeft size={20} /> Back
                </Link>
            </div>

            <div className="glass-panel auth-card">
                <div className="auth-header">
                    <div style={{ width: '4rem', height: '4rem', background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', borderRadius: '1rem', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <UserCircle2 size={32} />
                    </div>
                    <h2>Plumber Sign In</h2>
                    <p>Access your assigned jobs and properties</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && (
                        <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.5)', borderRadius: '0.5rem', color: '#ef4444', fontSize: '0.875rem' }}>
                            {error}
                        </div>
                    )}

                    <div className="input-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <UserCircle2 className="input-icon" size={18} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="plumber@example.com"
                                className="premium-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <KeyRound className="input-icon" size={18} />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••"
                                className="premium-input"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="premium-btn" style={{ marginTop: '1rem', background: '#f97316' }}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Don't have a plumber account? <Link to="/plumber/register" className="auth-link orange">Apply Here</Link>
                    </p>
                    <p style={{ marginTop: '0.5rem' }}>
                        Are you a Customer? <Link to="/login" className="auth-link">Customer Portal</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PlumberLoginPage;
