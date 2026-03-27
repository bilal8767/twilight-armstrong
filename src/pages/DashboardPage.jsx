import React, { useState, useEffect } from 'react';
import { Users, FileText, Download, Activity, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const response = await fetch('/api/submissions');
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            setSubmissions(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const formatFileName = (filePath) => {
        if (!filePath) return "N/A";
        return filePath.split('\\').pop().split('/').pop();
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-secondary">Overview of received customer submissions and documents.</p>
            </div>

            {/* Stats Grid & QR Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Submissions" value={loading ? "-" : submissions.length} change="All time" icon={<Users className="text-accent-primary" />} />
                <StatCard title="Pending Review" value={loading ? "-" : Math.round(submissions.length * 0.8)} change="Needs attention" icon={<Activity className="text-yellow-400" />} />
                
                {/* QR Code Sharing Card */}
                <div className="card hover:border-white/20 transition-colors col-span-1 md:col-span-2 lg:col-span-2 flex flex-row items-center justify-between">
                    <div>
                        <h3 className="text-sm font-medium text-secondary mb-1">Share Form (Public Link)</h3>
                        <p className="text-2xl font-bold mb-2">Scan QR Code</p>
                        <p className="text-xs text-secondary mb-4">Anyone can scan this to open the form.</p>
                        <a href={`${window.location.origin}/register`} target="_blank" rel="noreferrer" className="text-accent-primary text-sm hover:underline font-mono break-all line-clamp-2" title={`${window.location.origin}/register`}>
                            {window.location.origin}/register
                        </a>
                    </div>
                    <div className="bg-white p-2 rounded-xl shrink-0 ml-4 hidden sm:block">
                        <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(window.location.origin + '/register')}`} 
                            alt="QR Code" 
                            className="w-[100px] h-[100px]" 
                        />
                    </div>
                </div>
            </div>

            {/* Submissions Table */}
            <div className="card">
                <h3 className="text-lg font-bold mb-6">Recent Customer Submissions</h3>
                
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <QrCode className="animate-spin text-accent-primary w-8 h-8" />
                    </div>
                ) : submissions.length === 0 ? (
                    <div className="text-center text-secondary py-12">No submissions found yet.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-secondary text-sm">
                                    <th className="pb-3 px-4 font-medium">Customer Name</th>
                                    <th className="pb-3 px-4 font-medium">Property Name</th>
                                    <th className="pb-3 px-4 font-medium">Type</th>
                                    <th className="pb-3 px-4 font-medium">Energieausweis</th>
                                    <th className="pb-3 px-4 font-medium">Heizungsbauer</th>
                                    <th className="pb-3 px-4 font-medium">Date Issued</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {submissions.map((sub) => (
                                    <tr key={sub.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="py-4 px-4 font-medium whitespace-nowrap">{sub.name}</td>
                                        <td className="py-4 px-4 text-secondary whitespace-nowrap">{sub.propertyName || "N/A"}</td>
                                        <td className="py-4 px-4">
                                            <span className="bg-white/10 text-xs px-2 py-1 rounded-full text-secondary capitalize">
                                                {sub.propertyType || "N/A"}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            {sub.energieausweisPath ? (
                                                <a 
                                                    href={sub.energieausweisPath} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
                                                >
                                                    <FileText size={14} /> View
                                                </a>
                                            ) : (
                                                <span className="text-secondary text-xs">None</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4">
                                            {sub.heizungsbauerPath ? (
                                                <a 
                                                    href={sub.heizungsbauerPath} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 transition-colors"
                                                >
                                                    <Download size={14} /> View
                                                </a>
                                            ) : (
                                                <span className="text-secondary text-xs">None</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4 text-xs text-secondary whitespace-nowrap">
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
    );
};

const StatCard = ({ title, value, change, icon }) => (
    <div className="card hover:border-white/20 transition-colors">
        <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-secondary">{title}</span>
            {icon}
        </div>
        <div className="text-2xl font-bold mb-1">{value}</div>
        <p className="text-xs text-secondary">{change}</p>
    </div>
);

export default DashboardPage;
