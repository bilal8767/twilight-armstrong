import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

const ModuleFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'Active',
        version: '1.0.0'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            // Mock fetch data
            setFormData({
                name: 'Authentication Module',
                description: 'Handles user authentication, session management, and security protocols.',
                status: 'Active',
                version: '1.0.2'
            });
        }
    }, [isEditMode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Mock save
        setTimeout(() => {
            setLoading(false);
            navigate(isEditMode ? `/dashboard/modules/${id}` : '/dashboard/modules');
        }, 1000);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link to={isEditMode ? `/dashboard/modules/${id}` : "/dashboard/modules"} className="p-2 hover:bg-white/10 rounded-full transition-colors text-secondary hover:text-white">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Module' : 'Create Module'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="card space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary">Module Name</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-black/30 border-white/10 focus:border-accent-primary"
                        placeholder="e.g., Payment Gateway"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary">Description</label>
                    <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-black/30 border-white/10 focus:border-accent-primary"
                        placeholder="Describe the module's purpose..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-secondary">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full bg-black/30 border-white/10 focus:border-accent-primary"
                        >
                            <option value="Active">Active</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Deprecated">Deprecated</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-secondary">Version</label>
                        <input
                            type="text"
                            required
                            value={formData.version}
                            onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                            className="w-full bg-black/30 border-white/10 focus:border-accent-primary"
                            placeholder="1.0.0"
                        />
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-4 border-t border-white/5">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn bg-white/5 hover:bg-white/10 border border-white/10"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary gap-2 min-w-[120px]"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {isEditMode ? 'Update Module' : 'Create Module'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModuleFormPage;
