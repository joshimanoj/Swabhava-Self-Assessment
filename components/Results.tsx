import React, { useMemo } from 'react';
import { AssessmentResult, Guna } from '../types';
import { GUNA_DESCRIPTIONS } from '../constants';
import { Button } from './Button';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { Home, RefreshCw } from 'lucide-react';

interface ResultsProps {
  result: AssessmentResult;
  onRetake: () => void;
  onHome: () => void;
}

export const Results: React.FC<ResultsProps> = ({ result, onRetake, onHome }) => {
  const chartData = useMemo(() => [
    { subject: 'Sattva', A: result.scores[Guna.Sattva], fullMark: 10 },
    { subject: 'Rajas', A: result.scores[Guna.Rajas], fullMark: 10 },
    { subject: 'Tamas', A: result.scores[Guna.Tamas], fullMark: 10 },
  ], [result]);

  const dominantGuna = result.dominant;
  const description = GUNA_DESCRIPTIONS[dominantGuna];

  return (
    <div className="min-h-screen bg-brand-cream py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <p className="text-sm font-bold tracking-widest text-gray-400 uppercase">Assessment Complete</p>
          <h1 className="text-4xl md:text-6xl font-serif text-brand-dark">
            Your Svabhava Profile
          </h1>
          <p className="text-xl text-gray-600">
             Hello, <span className="font-semibold text-brand-dark">{result.userName}</span>. Here is your leadership analysis.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Chart Section */}
          <div className="bg-white rounded-3xl shadow-xl p-4 h-[400px] flex items-center justify-center relative overflow-hidden border border-brand-stone/50">
             <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                <PolarGrid stroke="#e5e5e0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#1a1a1a', fontSize: 14, fontFamily: 'serif', fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                <Radar
                  name="Score"
                  dataKey="A"
                  stroke="#d64045"
                  strokeWidth={3}
                  fill="#d64045"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="absolute bottom-4 right-6 text-xs text-gray-400 font-mono">
                {new Date(result.timestamp).toLocaleDateString()}
            </div>
          </div>

          {/* Text Analysis Section */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-brand-red">
                <h3 className="text-sm uppercase tracking-wide text-gray-400 mb-2">Dominant Tendency</h3>
                <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">{dominantGuna}</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                    {description.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {description.keywords.split(', ').map(k => (
                        <span key={k} className="px-3 py-1 bg-brand-cream border border-brand-stone rounded-full text-xs font-semibold text-brand-dark">
                            {k}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {Object.entries(result.scores).map(([guna, score]) => (
                    <div key={guna} className="bg-white p-4 rounded-2xl shadow-sm text-center border border-gray-100">
                        <div className="text-2xl font-bold text-brand-dark">{score}</div>
                        <div className="text-xs uppercase text-gray-400 font-medium tracking-wider">{guna}</div>
                    </div>
                ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 pt-8">
            <Button onClick={onHome} variant="outline">
                <Home className="w-4 h-4" /> Home
            </Button>
            <Button onClick={onRetake} variant="primary">
                <RefreshCw className="w-4 h-4" /> Retake Assessment
            </Button>
        </div>
      </div>
    </div>
  );
};
