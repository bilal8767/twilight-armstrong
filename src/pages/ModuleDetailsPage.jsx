import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash, Activity, GitBranch, Clock } from 'lucide-react';

const ModuleDetailsPage = () => {
    const { id } = useParams();

    // Mock Data fetch based on ID
    const module = {
        id,
        name: 'Authentication Module',
        status: 'Active',
        version: '1.0.2',
        description: 'Handles user authentication, session management, and security protocols.',
        lastUpdated: '2 hours ago',
        author: 'Jane Doe',
        deployment: 'Production'
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link to="/dashboard/modules" className="p-2 hover:bg-white/10 rounded-full transition-colors text-secondary hover:text-white">
                    <ArrowLeft size={20} />
                </Link>
                <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-2xl font-bold">{module.name}</h1>
                        <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-semibold">
                            {module.status}
                        </span>
                    </div>
                    <p className="text-secondary text-sm">ID: {module.id} • Version {module.version}</p>
                </div>
                <div className="flex gap-2">
                    <Link to={`/dashboard/modules/${id}/edit`} className="btn bg-white/5 hover:bg-white/10 border border-white/10 gap-2">
                        <Edit size={16} /> Edit
                    </Link>
                    <button className="btn bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 gap-2">
                        <Trash size={16} /> Delete
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="card">
                        <h3 className="text-lg font-bold mb-4">About</h3>
                        <p className="text-secondary leading-relaxed">
                            {module.description}
                        </p>
                    </div>

                    <div className="card">
                        <h3 className="text-lg font-bold mb-4">Configuration</h3>
                        <div className="bg-black/30 p-4 rounded-lg font-mono text-sm text-secondary border border-white/5">
                            {`{
  "auth_type": "jwt",
  "token_expiry": "3600",
  "refresh_enabled": true,
  "mfa_required": false
}`}
                        </div>
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    <div className="card">
                        <h3 className="text-sm font-medium text-secondary uppercase tracking-wider mb-4">Metadata</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-secondary">
                                    <Clock size={16} />
                                    <span>Last Updated</span>
                                </div>
                                <span className="font-medium text-white">{module.lastUpdated}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-secondary">
                                    <GitBranch size={16} />
                                    <span>Version</span>
                                </div>
                                <span className="font-medium text-white">{module.version}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-secondary">
                                    <Activity size={16} />
                                    <span>Deployment</span>
                                </div>
                                <span className="font-medium text-white">{module.deployment}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleDetailsPage;
