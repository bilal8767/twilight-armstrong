import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowRight, Loader2, KeyRound, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        setTimeout(() => {
            const res = login(formData.email, formData.password);
            
            if (res.success) {
                if (res.isAdmin) {
                    navigate('/dashboard');
                } else {
                    setError('Access Denied. You are not an administrator.');
                    // Don't fully log them in if they aren't admin, or let them sit here with error.
                }
            } else {
                setError(res.message || 'Invalid admin credentials');
            }
            setLoading(false);
        }, 800);
    };

    return (
        <div className="auth-wrapper" style={{ background: '#09090b' }}>
            {/* Darker/Red ambiance for admin */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at 50% 0%, rgba(225, 29, 72, 0.15), transparent 50%)', zIndex: 0, pointerEvents: 'none' }}></div>

            <div className="glass-panel auth-card" style={{ border: '1px solid rgba(225, 29, 72, 0.2)', boxShadow: '0 25px 50px -12px rgba(225, 29, 72, 0.15)' }}>
                <div className="auth-header">
                    <div style={{ width: '4rem', height: '4rem', background: 'rgba(225, 29, 72, 0.1)', color: '#e11d48', borderRadius: '1rem', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShieldAlert size={32} />
                    </div>
                    <h2 style={{ color: '#fff' }}>Admin Access</h2>
                    <p style={{ color: '#a1a1aa' }}>Restricted system administration portal</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && (
                        <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.5)', borderRadius: '0.5rem', color: '#ef4444', fontSize: '0.875rem', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}

                    <div className="input-group">
                        <label>Admin Email</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={18} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="admin@domain.com"
                                className="premium-input"
                                style={{ border: '1px solid rgba(225, 29, 72, 0.2)' }}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Admin Password</label>
                        <div className="input-wrapper">
                            <KeyRound className="input-icon" size={18} />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="premium-input"
                                style={{ border: '1px solid rgba(225, 29, 72, 0.2)' }}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="premium-btn" style={{ marginTop: '1rem', background: '#e11d48' }}>
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <>Authenticate <ArrowRight size={20} /></>}
                    </button>
                </form>
                
                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.75rem', color: '#52525b' }}>
                    Unauthorized access is strictly prohibited.
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
