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

  const handleStart = (name: string) => {
    setUserName(name);
    setView('assessment');
  };

  const calculateResults = (answers: Record<number, 'A' | 'B' | 'C'>) => {
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
    const sortedGunas = Object.entries(scores).sort(([,a], [,b]) => b - a);
    const dominant = sortedGunas[0][0] as Guna;

    const result: AssessmentResult = {
      id: Date.now().toString(),
      userName,
      timestamp: Date.now(),
      scores,
      dominant,
      answers
    };

    saveResult(result);
    setCurrentResult(result);
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
    </main>
  );
};

export default App;
