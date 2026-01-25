import React, { useEffect, useState } from 'react';
import { AssessmentResult } from '../types';
import { getAllResults, clearAllResults, isCloudEnabled } from '../services/storageService';
import { Button } from './Button';
import { ArrowLeft, Download, Trash2, Loader2, Lock, Cloud, HardDrive } from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [loading, setLoading] = useState(true);
  const isCloud = isCloudEnabled();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        setLoading(true);
        const data = await getAllResults();
        setResults(data);
        setLoading(false);
      };
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'kalyan@13579') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid Access Code');
    }
  };

  const handleClear = async () => {
    if (confirm("Are you sure you want to delete local data? Cloud deletion is restricted.")) {
      await clearAllResults();
      // Refresh
      const data = await getAllResults();
      setResults(data);
    }
  };

  const downloadCSV = () => {
    const headers = ["Name", "Date", "Sattva", "Rajas", "Tamas", "Dominant"];
    const rows = results.map(r => [
      r.userName,
      new Date(r.timestamp).toLocaleDateString(),
      r.scores.Sattva,
      r.scores.Rajas,
      r.scores.Tamas,
      r.dominant
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "svabhava_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-brand-stone/50">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-brand-dark rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-serif font-bold text-center text-brand-dark mb-2">Admin Access</h2>
          <p className="text-center text-gray-500 mb-8">Enter the access code to view assessment data.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Access Code"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-dark focus:border-brand-dark transition-colors outline-none"
                autoFocus
              />
              {authError && <p className="text-red-500 text-sm mt-2 ml-1">{authError}</p>}
            </div>
            <Button type="submit" fullWidth>
              Enter Dashboard
            </Button>
            <div className="pt-4 text-center">
              <button type="button" onClick={onBack} className="text-sm text-gray-400 hover:text-brand-dark underline">
                Return to App
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Button onClick={onBack} variant="ghost" className="mb-2 pl-0 hover:bg-transparent hover:text-brand-dark">
              <ArrowLeft className="w-4 h-4" /> Back to App
            </Button>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-serif font-bold text-brand-dark">Admin Dashboard</h1>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${isCloud ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`}>
                {isCloud ? <Cloud className="w-3 h-3" /> : <HardDrive className="w-3 h-3" />}
                {isCloud ? 'Cloud Connected' : 'Local Storage'}
              </div>
            </div>
            <p className="text-gray-500 mt-1">
              {loading ? 'Syncing...' : `Viewing ${results.length} total submissions`}
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={downloadCSV} variant="outline" disabled={results.length === 0 || loading}>
              <Download className="w-4 h-4" /> CSV
            </Button>
            <Button onClick={handleClear} variant="secondary" disabled={results.length === 0 || loading}>
              <Trash2 className="w-4 h-4" /> Clear Local
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin text-brand-dark" />
              <p>Fetching data from {isCloud ? 'Supabase' : 'Local Storage'}...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="p-4 font-semibold text-gray-600 text-sm">User Name</th>
                    <th className="p-4 font-semibold text-gray-600 text-sm">Date</th>
                    <th className="p-4 font-semibold text-gray-600 text-sm">Dominant</th>
                    <th className="p-4 font-semibold text-gray-600 text-sm text-center">Sattva</th>
                    <th className="p-4 font-semibold text-gray-600 text-sm text-center">Rajas</th>
                    <th className="p-4 font-semibold text-gray-600 text-sm text-center">Tamas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {results.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-12 text-center text-gray-400">
                        No assessments found.
                      </td>
                    </tr>
                  ) : (
                    results.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium text-brand-dark">{r.userName}</td>
                        <td className="p-4 text-gray-500 text-sm">{new Date(r.timestamp).toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                ${r.dominant === 'Sattva' ? 'bg-blue-100 text-blue-700' :
                              r.dominant === 'Rajas' ? 'bg-red-100 text-red-700' :
                                'bg-gray-100 text-gray-700'
                            }`}>
                            {r.dominant}
                          </span>
                        </td>
                        <td className="p-4 text-center text-gray-600">{r.scores.Sattva}</td>
                        <td className="p-4 text-center text-gray-600">{r.scores.Rajas}</td>
                        <td className="p-4 text-center text-gray-600">{r.scores.Tamas}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};