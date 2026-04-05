import React, { useState, useEffect } from 'react';
import { FileText, Download, Home, Plus, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CustomerDashboardPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.email) {
            fetchSubmissions(user.email);
        } else {
            setLoading(false);
        }
    }, [user]);

    const fetchSubmissions = async (email) => {
        try {
            // Using relative URL so Vite proxy or direct server handles it properly
            const response = await fetch(`/api/submissions/user/${encodeURIComponent(email)}`);
            if (response.ok) {
                const data = await response.json();
                setSubmissions(data);
            } else {
                console.error("Failed to fetch. Checking fallback...");
                // Fallback attempt just in case CORS/render is required as in Wizard Page
                const fallbackResponse = await fetch(`http://localhost:3001/api/submissions/user/${encodeURIComponent(email)}`);
                if(fallbackResponse.ok) {
                    const data = await fallbackResponse.json();
                    setSubmissions(data);
                }
            }
        } catch (error) {
            console.error('Error fetching submissions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name || 'Customer'}</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage your properties and uploaded documents</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Log Out
                        </button>
                        <Link 
                            to="/wizard"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                        >
                            <Plus size={16} /> New Property
                        </Link>
                    </div>
                </header>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                        <Home className="text-blue-500" size={20} />
                        <h2 className="text-lg font-semibold text-gray-900">My Properties</h2>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-12 text-gray-400">
                            <Loader2 className="w-8 h-8 animate-spin mb-4" />
                            <p>Loading your documents...</p>
                        </div>
                    ) : submissions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-16 text-center">
                            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex justify-center items-center mb-4">
                                <FileText size={32} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents yet</h3>
                            <p className="text-gray-500 max-w-sm mb-6">You haven't uploaded any property documents yet. Click the button above to get started.</p>
                            <Link 
                                to="/wizard"
                                className="px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
                            >
                                Start First Upload
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                        <th className="py-4 px-6 font-medium">Property</th>
                                        <th className="py-4 px-6 font-medium">Type</th>
                                        <th className="py-4 px-6 font-medium">Energy Certificate</th>
                                        <th className="py-4 px-6 font-medium">Heating Contractor</th>
                                        <th className="py-4 px-6 font-medium text-right">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-100">
                                    {submissions.map((sub, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="font-medium text-gray-900">{sub.propertyName || 'N/A'}</div>
                                                <div className="text-xs text-gray-500 mt-1">{sub.address || 'No Address'}</div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-xs font-medium capitalize">
                                                    {sub.propertyType || "N/A"}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                {sub.energieausweisPath ? (
                                                    <a 
                                                        href={sub.energieausweisPath} 
                                                        target="_blank" 
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium"
                                                    >
                                                        <FileText size={16} /> View
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400 text-xs italic">Pending</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6">
                                                {sub.heizungsbauerPath ? (
                                                    <a 
                                                        href={sub.heizungsbauerPath} 
                                                        target="_blank" 
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1.5 text-orange-600 hover:text-orange-800 font-medium"
                                                    >
                                                        <Download size={16} /> View
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400 text-xs italic">Pending</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6 text-right text-sm text-gray-500 whitespace-nowrap">
                                                {new Date(sub.timestamp).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboardPage;
