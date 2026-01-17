import { AssessmentResult } from '../types';

const STORAGE_KEY = 'svabhava_users';

export const saveResult = (result: AssessmentResult): void => {
  const existingStr = localStorage.getItem(STORAGE_KEY);
  let existing: AssessmentResult[] = [];
  if (existingStr) {
    try {
      existing = JSON.parse(existingStr);
    } catch (e) {
      console.error("Failed to parse storage", e);
    }
  }
  existing.push(result);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
};

export const getAllResults = (): AssessmentResult[] => {
  const existingStr = localStorage.getItem(STORAGE_KEY);
  if (!existingStr) return [];
  try {
    return JSON.parse(existingStr);
  } catch (e) {
    console.error("Failed to parse storage", e);
    return [];
  }
};

export const clearAllResults = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
