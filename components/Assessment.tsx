import React, { useState } from 'react';
import { Question, Option } from '../types';
import { QUESTIONS } from '../constants';
import { Button } from './Button';
import { ChevronRight, Check } from 'lucide-react';

interface AssessmentProps {
  onComplete: (answers: Record<number, 'A' | 'B' | 'C'>) => void;
}

export const Assessment: React.FC<AssessmentProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C'>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const handleOptionSelect = (optionId: 'A' | 'B' | 'C') => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
    
    // Smooth auto-advance
    if (currentIndex < QUESTIONS.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsTransitioning(false);
      }, 400);
    } else {
        // Last question
        onComplete({ ...answers, [currentQuestion.id]: optionId });
    }
  };

  const handleNext = () => {
     if (currentIndex < QUESTIONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
     } else {
        onComplete(answers);
     }
  }

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center py-8 px-4 md:px-8">
      {/* Progress Bar */}
      <div className="w-full max-w-3xl mb-8">
        <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          <span>Progress</span>
          <span>{currentIndex + 1} / {QUESTIONS.length}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-dark transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className={`w-full max-w-3xl flex-1 flex flex-col justify-center transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-brand-stone text-brand-dark text-xs font-bold rounded-full mb-4">
            QUESTION {currentQuestion.id}
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-900 leading-tight">
            {currentQuestion.text}
          </h2>
        </div>

        <div className="space-y-4">
          {currentQuestion.options.map((option) => {
            const isSelected = answers[currentQuestion.id] === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`w-full text-left p-6 md:p-8 rounded-2xl border-2 transition-all duration-200 group relative overflow-hidden
                  ${isSelected 
                    ? 'border-brand-dark bg-white shadow-lg' 
                    : 'border-transparent bg-white shadow-md hover:border-brand-stone hover:shadow-lg'
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg font-serif border-2 transition-colors
                    ${isSelected 
                      ? 'bg-brand-dark text-white border-brand-dark' 
                      : 'bg-transparent text-gray-400 border-gray-200 group-hover:border-brand-dark group-hover:text-brand-dark'
                    }
                  `}>
                    {option.id}
                  </div>
                  <p className={`text-base md:text-lg leading-relaxed ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                    {option.text}
                  </p>
                </div>
                {isSelected && (
                  <div className="absolute top-4 right-4 text-brand-dark">
                    <Check className="w-6 h-6" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
        
      {/* Navigation Buttons for manual control if needed, mostly hidden by auto-advance but good for UX backup */}
      <div className="w-full max-w-3xl mt-8 flex justify-end">
          {answers[currentQuestion.id] && currentIndex < QUESTIONS.length - 1 && !isTransitioning && (
             <Button onClick={handleNext} variant="ghost">
                Next <ChevronRight className="w-4 h-4" />
             </Button>
          )}
      </div>
    </div>
  );
};
