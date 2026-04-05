import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login, logout } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        // Simulate network request
        setTimeout(() => {
            const res = login(formData.email, formData.password);
            
            if (res.success) {
                if (res.isAdmin) {
                    setError('Administrators must use the dedicated Admin Portal to log in.');
                    logout();
                } else {
                    navigate('/customer-dashboard');
                }
            } else {
                setError(res.message || 'Failed to sign in');
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
                    <h2>Customer Sign In</h2>
                    <p>Access your mobile wizard to upload documents</p>
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
                            <Mail className="input-icon" size={18} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="customer@example.com"
                                className="premium-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={18} />
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

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '-0.5rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.875rem', cursor: 'pointer' }}>
                            <input type="checkbox" style={{ accentColor: '#3b82f6' }} /> Remember me
                        </label>
                        <a href="#" style={{ color: '#3b82f6', fontSize: '0.875rem', textDecoration: 'none' }}>Forgot password?</a>
                    </div>

                    <button type="submit" disabled={loading} className="premium-btn" style={{ marginTop: '1rem' }}>
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <>Sign In <ArrowRight size={20} /></>}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Don't have an account? <Link to="/register" className="auth-link">Create one</Link>
                    </p>
                    <p style={{ marginTop: '0.5rem' }}>
                        Are you a Plumber/Partner? <Link to="/plumber/login" className="auth-link orange">Plumber Portal</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
