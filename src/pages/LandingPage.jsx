import React from 'react';
import { ArrowRight, Layout, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-primary">
            {/* Header */}
            <header className="container py-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center text-white font-bold">
                        M
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        ModernApp
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex gap-4">
                        <Link to="/login" className="text-sm font-medium hover:text-white text-secondary transition-colors py-2">
                            Customer Login
                        </Link>
                        <Link to="/plumber/login" className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-bold hover:bg-white/20 transition-colors">
                            Plumber Portal
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="landing-hero">
                <div className="glass-panel" style={{ padding: '0.5rem 1rem', borderRadius: '2rem', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6', boxShadow: '0 0 10px #3b82f6' }}></span>
                    <span style={{ color: '#60a5fa', fontSize: '0.875rem', fontWeight: '600' }}>Please select your portal</span>
                </div>

                <h1 className="landing-title">
                    Welcome to <span className="text-gradient">ModernApp</span>
                </h1>

                <p className="landing-subtitle">
                    Choose how you want to interact with our platform today.
                </p>

                <div className="landing-cards">
                    
                    {/* Customer Portal Card */}
                    <div className="portal-card customer">
                        <div className="portal-card-inner">
                            <div className="portal-icon customer">
                                <Layout size={32} color="white" />
                            </div>
                            
                            <h2>Customer</h2>
                            <p>
                                Access your mobile wizard to upload and manage your property documents securely.
                            </p>
                            
                            <Link to="/login" className="portal-btn customer">
                                <span>Customer Portal</span>
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Plumber Portal Card */}
                    <div className="portal-card plumber">
                        <div className="portal-card-inner">
                            <div className="portal-icon plumber">
                                <Zap size={32} color="white" />
                            </div>
                            
                            <h2>Plumber</h2>
                            <p>
                                Professional partner dashboard to manage assigned installations and customer locations.
                            </p>
                            
                            <Link to="/plumber/login" className="portal-btn plumber">
                                <span>Partner Portal</span>
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

            {/* Features */}
            <section className="container py-20 border-t border-white/5">
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Zap className="text-yellow-400" />}
                        title="Lightning Fast"
                        description="Optimized for speed and performance. Experience zero lag with our edge-cached infrastructure."
                    />
                    <FeatureCard
                        icon={<Shield className="text-green-400" />}
                        title="Secure by Default"
                        description="Enterprise-grade security built-in. Your data is encrypted at rest and in transit."
                    />
                    <FeatureCard
                        icon={<Layout className="text-purple-400" />}
                        title="Modern Interface"
                        description="A beautiful, intuitive interface that helps you focus on what matters most."
                    />
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-secondary leading-relaxed">{description}</p>
    </div>
);

export default LandingPage;
