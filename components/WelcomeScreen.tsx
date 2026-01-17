import React, { useState } from 'react';
import { Button } from './Button';
import { ArrowRight, Flower, Shield } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: (name: string) => void;
  onAdminLogin: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onAdminLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-brand-cream relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-2xl w-full z-10 text-center space-y-8 animate-fade-in-up">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-brand-dark rounded-full flex items-center justify-center shadow-2xl">
            <Flower className="w-8 h-8 text-brand-gold" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark tracking-tight">
            Know Your <span className="text-brand-red">Svabhava</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-lg mx-auto">
            Understanding Your Natural Leadership Tendencies and Dispositions Through Ancient Wisdom
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-brand-stone/50 max-w-md mx-auto transform transition-all hover:scale-[1.01]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 text-left">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-1">
                Enter your name to begin
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-dark focus:border-brand-dark transition-colors bg-brand-cream/30"
                placeholder="Your Full Name"
                required
              />
            </div>
            <Button type="submit" fullWidth disabled={!name.trim()}>
              Begin Assessment <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500 pt-8 border-t border-brand-stone/50 mt-8">
            <div className="flex flex-col items-center gap-2">
                <span className="font-semibold text-brand-dark">5 Dimensions</span>
                <span>Based on Bhagavad Gita</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <span className="font-semibold text-brand-dark">3 Gunas</span>
                <span>Sattva, Rajas, Tamas</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <span className="font-semibold text-brand-dark">Insightful</span>
                <span>No right or wrong answers</span>
            </div>
        </div>
      </div>

      <footer className="absolute bottom-4 text-center w-full text-xs text-gray-400">
        <button onClick={onAdminLogin} className="hover:text-brand-dark transition-colors flex items-center justify-center gap-1 mx-auto">
           <Shield className="w-3 h-3" /> Admin Portal
        </button>
      </footer>
    </div>
  );
};
