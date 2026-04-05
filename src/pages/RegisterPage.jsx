import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, Loader2, ArrowLeft, Phone } from 'lucide-react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', password: '' });
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
            const result = register(formData.name, formData.email, formData.password, 'customer', formData.phone, formData.message);
            
            if (result.success) {
                navigate('/login');
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
                    <h2>Wir freuen uns, von Ihnen zu hören</h2>
                    <p>Lassen Sie uns wissen, wie wir Ihnen helfen können!</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && (
                        <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.5)', borderRadius: '0.5rem', color: '#ef4444', fontSize: '0.875rem' }}>
                            {error}
                        </div>
                    )}

                    <div className="input-group">
                        <label>Vor- und Nachname</label>
                        <div className="input-wrapper">
                            <User className="input-icon" size={18} />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Max Mustermann"
                                className="premium-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>E-Mail</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={18} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="kunde@beispiel.de"
                                className="premium-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Telefonnummer</label>
                        <div className="input-wrapper">
                            <Phone className="input-icon" size={18} />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+49 151 12345678"
                                className="premium-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Schreiben Sie eine Nachricht..."
                            className="premium-input"
                            style={{ minHeight: '100px', paddingTop: '0.75rem', resize: 'vertical' }}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Passwort</label>
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
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <>Absenden <ArrowRight size={20} /></>}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Bereits registriert? <Link to="/login" className="auth-link">Anmelden</Link>
                    </p>
                    <p style={{ marginTop: '0.5rem' }}>
                        Sind Sie Handwerker? <Link to="/plumber/register" className="auth-link orange">Handwerker-Portal</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
