export enum Guna {
  Sattva = 'Sattva',
  Rajas = 'Rajas',
  Tamas = 'Tamas'
}

export interface Option {
  id: 'A' | 'B' | 'C';
  text: string;
  guna: Guna;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface AssessmentResult {
  id: string;
  userName: string;
  timestamp: number;
  scores: {
    [key in Guna]: number;
  };
  dominant: Guna;
  answers: Record<number, 'A' | 'B' | 'C'>;
}

export type ViewState = 'welcome' | 'assessment' | 'results' | 'admin';
