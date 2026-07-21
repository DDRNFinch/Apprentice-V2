import { create } from 'zustand';

export interface Course {
  id: string;
  name: string;
  progress: number;
  trainingModules?: any[];
  ksbs?: any[];
  assignments?: any[];
  documents?: any[];
}

export interface AppState {
  selectedCourse: Course | null;
  setCourse: (course: Course) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedCourse: null,
  setCourse: (course: Course) => set({ selectedCourse: course }),
}));
