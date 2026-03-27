import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, MoreVertical, Filter } from 'lucide-react';

const MOCK_MODULES = [
    { id: 1, name: 'Authentication Module', status: 'Active', version: '1.0.2', lastUpdated: '2h ago' },
    { id: 2, name: 'User Management', status: 'In Progress', version: '0.9.0', lastUpdated: '5h ago' },
    { id: 3, name: 'Payment Gateway', status: 'Active', version: '2.1.0', lastUpdated: '1d ago' },
    { id: 4, name: 'Reporting Engine', status: 'Maintenance', version: '1.5.0', lastUpdated: '3d ago' },
    { id: 5, name: 'Notification Service', status: 'Active', version: '1.1.0', lastUpdated: '1w ago' },
];

const ModulesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredModules = MOCK_MODULES.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Modules</h1>
                    <p className="text-secondary">Manage and track your system modules.</p>
                </div>
                <Link to="/dashboard/modules/new" className="btn btn-primary gap-2">
                    <Plus size={18} />
                    Create Module
                </Link>
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-grow max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search modules..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 bg-secondary border-none"
                    />
                </div>
                <button className="btn bg-secondary gap-2 hover:bg-white/10">
                    <Filter size={18} />
                    Filters
                </button>
            </div>

            {/* List */}
            <div className="bg-secondary rounded-lg border border-white/5 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5">
                            <th className="p-4 font-medium text-secondary">Name</th>
                            <th className="p-4 font-medium text-secondary">Status</th>
                            <th className="p-4 font-medium text-secondary">Version</th>
                            <th className="p-4 font-medium text-secondary">Last Updated</th>
                            <th className="p-4 font-medium text-secondary text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredModules.map((module) => (
                            <tr key={module.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                <td className="p-4">
                                    <Link to={`/dashboard/modules/${module.id}`} className="font-medium hover:text-accent-secondary">
                                        {module.name}
                                    </Link>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                        ${module.status === 'Active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                            module.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                                        {module.status}
                                    </span>
                                </td>
                                <td className="p-4 text-secondary">{module.version}</td>
                                <td className="p-4 text-secondary">{module.lastUpdated}</td>
                                <td className="p-4 text-right">
                                    <button className="p-2 hover:bg-white/10 rounded-md text-secondary hover:text-white transition-colors">
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredModules.length === 0 && (
                    <div className="p-8 text-center text-secondary">
                        No modules found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModulesPage;
