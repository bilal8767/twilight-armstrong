import React, { useState } from 'react';
import { ArrowLeft, UserCircle2, KeyRound, Type } from 'lucide-react';
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
        <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-8 left-8">
                <Link to="/landing" className="flex items-center gap-2 text-secondary hover:text-white transition-colors">
                    <ArrowLeft size={20} /> Back
                </Link>
            </div>

            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl mx-auto flex items-center justify-center mb-4">
                        <UserCircle2 size={32} />
                    </div>
                    <h2 className="text-3xl font-bold mb-2 text-white">Plumber Sign Up</h2>
                    <p className="text-secondary">Apply to join our partner network</p>
                </div>

                <form onSubmit={handleSubmit} className="p-2 space-y-6">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-secondary">Full Name</label>
                        <div className="relative">
                            <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-secondary">Email</label>
                        <div className="relative">
                            <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="plumber@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-secondary">Password</label>
                        <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <div className="text-center mt-8 text-secondary">
                    Already an approved Plumber?{' '}
                    <Link to="/plumber/login" className="text-blue-400 hover:text-blue-300 hover:underline">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PlumberRegisterPage;
