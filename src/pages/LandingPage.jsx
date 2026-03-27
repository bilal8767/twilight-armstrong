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
                    <Link to="/login" className="text-sm font-medium hover:text-white text-secondary transition-colors">
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="px-4 py-2 bg-white text-primary rounded-full text-sm font-bold hover:bg-gray-200 transition-colors"
                    >
                        Get Started
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="container py-20 md:py-32 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-xs font-semibold mb-6 border border-accent-primary/20">
                    <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse"></span>
                    v1.0 is now live
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 pb-2">
                    Build faster with <br />
                    <span className="text-accent-primary">Intelligence.</span>
                </h1>

                <p className="text-lg md:text-xl text-secondary max-w-2xl mb-10 leading-relaxed">
                    The all-in-one platform for managing your projects, modules, and workflows with a premium, modern interface designed for speed.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <Link
                        to="/register"
                        className="group px-8 py-3 bg-accent-primary hover:bg-accent-secondary text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                    >
                        Start for free
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        to="/login"
                        className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold transition-all border border-white/10 backdrop-blur-sm"
                    >
                        View Demo
                    </Link>
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
