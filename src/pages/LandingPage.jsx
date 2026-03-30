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
            <section className="container py-20 flex flex-col items-center justify-center min-h-[85vh] text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-xs font-semibold mb-6 border border-accent-primary/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                    <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse"></span>
                    Please select your portal
                </div>

                <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight text-white pb-2">
                    Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">ModernApp</span>
                </h1>

                <p className="text-lg text-secondary max-w-2xl mb-12 leading-relaxed">
                    Choose how you want to interact with our platform today.
                </p>

                <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto px-4">
                    
                    {/* Customer Portal Card */}
                    <div className="group relative w-full rounded-3xl p-1 bg-gradient-to-b from-blue-500/40 to-blue-500/0 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-2">
                        <div className="relative h-full bg-[#0a1122] rounded-[22px] p-8 md:p-10 flex flex-col h-[320px] overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-all duration-700"></div>
                            
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                                <Layout size={32} className="text-white" />
                            </div>
                            
                            <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Customer</h2>
                            <p className="text-secondary text-base mb-8 flex-grow">
                                Access your mobile wizard to upload and manage your property documents securely.
                            </p>
                            
                            <Link 
                                to="/register"
                                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors flex items-center justify-between px-6 z-10"
                            >
                                <span>Get Started</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Plumber Portal Card */}
                    <div className="group relative w-full rounded-3xl p-1 bg-gradient-to-b from-orange-500/40 to-orange-500/0 hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-2">
                        <div className="relative h-full bg-[#0a1122] rounded-[22px] p-8 md:p-10 flex flex-col h-[320px] overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 group-hover:bg-orange-500/20 transition-all duration-700"></div>
                            
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
                                <Zap size={32} className="text-white fill-white/20" />
                            </div>
                            
                            <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Plumber</h2>
                            <p className="text-secondary text-base mb-8 flex-grow">
                                Professional partner dashboard to manage assigned installations and customer locations.
                            </p>
                            
                            <Link 
                                to="/plumber/register"
                                className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold transition-colors flex items-center justify-between px-6 backdrop-blur-md z-10"
                            >
                                <span>Apply / Logon</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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
