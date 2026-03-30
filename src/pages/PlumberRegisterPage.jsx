import React, { useState } from 'react';
import { ArrowLeft, UserCircle2, KeyRound, Type, Wrench, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PlumberRegisterPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
            const result = register(formData.name, formData.email, formData.password, 'plumber');
            setLoading(false);
            if (result.success) {
                if (result.isAdmin) {
                    navigate('/dashboard');
                } else if (result.role === 'plumber') {
                    navigate('/plumber-dashboard');
                } else {
                    navigate('/wizard');
                }
            } else {
                setError(result.message);
            }
        }, 800);
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
                        <Wrench size={32} />
                    </div>
                    <h2>Plumber Application</h2>
                    <p>Apply to become a verified partner</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && (
                        <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.5)', borderRadius: '0.5rem', color: '#ef4444', fontSize: '0.875rem' }}>
                            {error}
                        </div>
                    )}

                    <div className="input-group">
                        <label>Full Name</label>
                        <div className="input-wrapper">
                            <UserCircle2 className="input-icon" size={18} />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="premium-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={18} />
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
                        {loading ? 'Submitting...' : 'Apply Now'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Already a partner? <Link to="/plumber/login" className="auth-link orange">Sign in</Link>
                    </p>
                    <p style={{ marginTop: '0.5rem' }}>
                        Are you a Customer? <Link to="/register" className="auth-link">Customer Portal</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PlumberRegisterPage;
