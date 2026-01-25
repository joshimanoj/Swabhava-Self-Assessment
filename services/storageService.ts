import { AssessmentResult } from '../types';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURATION ---
// In a real build environment (like Vite/CRA), use import.meta.env or process.env
// For this demo, we check standard env locations.
const SUPABASE_URL = (window as any).process?.env?.REACT_APP_SUPABASE_URL || (import.meta as any).env?.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = (window as any).process?.env?.REACT_APP_SUPABASE_ANON_KEY || (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

let supabase: any = null;

if (SUPABASE_URL && SUPABASE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
} else {
  console.warn("Supabase credentials not found. Falling back to LocalStorage.");
}

const STORAGE_KEY = 'svabhava_users';

export const isCloudEnabled = (): boolean => {
  return !!supabase;
};

// --- DATABASE OPERATIONS ---

export const saveResult = async (result: AssessmentResult): Promise<void> => {
  // 1. Try Supabase
  if (supabase) {
    try {
      const { error } = await supabase
        .from('assessments')
        .insert([
          { 
            content: result,
            created_at: new Date().toISOString()
          }
        ]);
      
      if (error) throw error;
      return; // Success
    } catch (e) {
      console.error("Supabase Save Error:", e);
      // If supabase fails, fall back to local to prevent data loss for user
    }
  }

  // 2. Fallback to LocalStorage
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

export const getAllResults = async (): Promise<AssessmentResult[]> => {
  // 1. Try Supabase
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('assessments')
        .select('content')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        // Map the table structure back to our AssessmentResult type
        return data.map((row: any) => row.content);
      }
    } catch (e) {
      console.error("Supabase Fetch Error:", e);
    }
  }

  // 2. Fallback to LocalStorage
  const existingStr = localStorage.getItem(STORAGE_KEY);
  if (!existingStr) return [];
  try {
    return JSON.parse(existingStr).reverse(); // Local storage isn't ordered by default, so we reverse to show newest
  } catch (e) {
    console.error("Failed to parse storage", e);
    return [];
  }
};

export const clearAllResults = async (): Promise<void> => {
    // Note: In a real app, you might not want a 'clear all' for the database 
    // accessible to everyone. We will just clear local storage here, 
    // or if you want to clear DB, you'd need a backend function or RLS policy.
    
    if (supabase) {
        console.warn("Clear All is disabled for cloud database for safety.");
        alert("For safety, clearing cloud database is disabled in this demo view.");
        return;
    }

    localStorage.removeItem(STORAGE_KEY);
};