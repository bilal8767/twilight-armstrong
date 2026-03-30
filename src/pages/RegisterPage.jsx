import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        // Simulate network request
        setTimeout(() => {
            const result = register(name, email, password);
            setLoading(false);
            if (result.success) {
                if (result.isAdmin) {
                    navigate('/dashboard');
                } else {
                    navigate('/wizard');
                }
            } else {
                setError(result.message);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-accent-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">Customer Sign Up</h2>
                    <p className="text-secondary">Join us to start building better projects</p>
                </div>

                {error && <div className="mb-4 bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-secondary ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-10 bg-black/20 border-white/10 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all rounded-lg py-2.5"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-secondary ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 bg-black/20 border-white/10 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all rounded-lg py-2.5"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-secondary ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 bg-black/20 border-white/10 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all rounded-lg py-2.5"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-accent-primary hover:bg-accent-secondary text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Create Account <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-secondary">
                    Already have an account?{' '}
                    <Link to="/login" className="text-accent-primary hover:underline font-medium">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
