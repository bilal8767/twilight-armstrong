import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();
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
            const result = register(formData.name, formData.email, formData.password);
            
            if (result.success) {
                if (result.isAdmin) {
                    navigate('/dashboard');
                } else {
                    navigate('/wizard');
                }
            } else {
                setError(result.message);
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
                    <h2>Customer Sign Up</h2>
                    <p>Create an account to access the wizard</p>
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
                            <User className="input-icon" size={18} />
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

                    <button type="submit" disabled={loading} className="premium-btn" style={{ marginTop: '1rem' }}>
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <>Create Account <ArrowRight size={20} /></>}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
                    </p>
                    <p style={{ marginTop: '0.5rem' }}>
                        Are you a Plumber/Partner? <Link to="/plumber/register" className="auth-link orange">Plumber Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
