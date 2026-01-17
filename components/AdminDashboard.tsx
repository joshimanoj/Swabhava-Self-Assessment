import React, { useEffect, useState } from 'react';
import { AssessmentResult } from '../types';
import { getAllResults, clearAllResults } from '../services/storageService';
import { Button } from './Button';
import { ArrowLeft, Download, Trash2 } from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const [results, setResults] = useState<AssessmentResult[]>([]);

  useEffect(() => {
    setResults(getAllResults().reverse()); // Newest first
  }, []);

  const handleClear = () => {
    if (confirm("Are you sure you want to delete all data? This cannot be undone.")) {
      clearAllResults();
      setResults([]);
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

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Button onClick={onBack} variant="ghost" className="mb-2 pl-0 hover:bg-transparent hover:text-brand-dark">
                <ArrowLeft className="w-4 h-4" /> Back to App
            </Button>
            <h1 className="text-3xl font-serif font-bold text-brand-dark">Admin Dashboard</h1>
            <p className="text-gray-500">Viewing {results.length} total submissions</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={downloadCSV} variant="outline" disabled={results.length === 0}>
                <Download className="w-4 h-4" /> CSV
            </Button>
            <Button onClick={handleClear} variant="secondary" disabled={results.length === 0}>
                <Trash2 className="w-4 h-4" /> Clear Data
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
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
                            No assessments taken yet.
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
        </div>
      </div>
    </div>
  );
};
