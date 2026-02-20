import React, { useState } from 'react';
import { ViewState, AssessmentResult, Guna } from './types';
import { QUESTIONS } from './constants';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Assessment } from './components/Assessment';
import { Results } from './components/Results';
import { AdminDashboard } from './components/AdminDashboard';
import { saveResult } from './services/storageService';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('welcome');
  const [userName, setUserName] = useState('');
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleStart = (name: string) => {
    setUserName(name);
    setView('assessment');
  };

  const calculateResults = async (answers: Record<number, 'A' | 'B' | 'C'>) => {
    setIsSaving(true);
    const scores = {
      [Guna.Sattva]: 0,
      [Guna.Rajas]: 0,
      [Guna.Tamas]: 0
    };

    // Calculate score based on answers and Option mapping in constants
    QUESTIONS.forEach(q => {
      const selectedOptionId = answers[q.id];
      const selectedOption = q.options.find(o => o.id === selectedOptionId);
      if (selectedOption) {
        scores[selectedOption.guna]++;
      }
    });

    // Determine dominant
    const sortedGunas = Object.entries(scores).sort(([, a], [, b]) => b - a);
    const dominant = sortedGunas[0][0] as Guna;

    const result: AssessmentResult = {
      id: Date.now().toString(),
      userName,
      timestamp: Date.now(),
      scores,
      dominant,
      answers
    };

    try {
      await saveResult(result);
    } catch (error) {
      console.error("Error saving result", error);
    }

    setCurrentResult(result);
    setIsSaving(false);
    setView('results');
  };

  const handleRetake = () => {
    setView('assessment');
  };

  const handleHome = () => {
    setUserName('');
    setCurrentResult(null);
    setView('welcome');
  };

  return (
    <main className="font-sans text-brand-dark antialiased">
      {isSaving && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="animate-pulse text-brand-dark font-serif text-xl">Calculing Svabhava...</div>
        </div>
      )}

      {view === 'welcome' && (
        <WelcomeScreen
          onStart={handleStart}
          onAdminLogin={() => setView('admin')}
        />
      )}

      {view === 'assessment' && (
        <Assessment onComplete={calculateResults} />
      )}

      {view === 'results' && currentResult && (
        <Results
          result={currentResult}
          onRetake={handleRetake}
          onHome={handleHome}
        />
      )}

      {view === 'admin' && (
        <AdminDashboard onBack={() => setView('welcome')} />
      )}

      {view !== 'welcome' && (
        <footer className={`py-8 text-center ${view === 'admin' ? 'bg-gray-50' : 'bg-brand-cream'}`}>
          <div className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
            Powered by Brhat
          </div>
        </footer>
      )}
    </main>
  );
};

export default App;
