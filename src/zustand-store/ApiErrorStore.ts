import { create } from 'zustand';

interface ErrorState {
  visible: boolean;
  message: string;
  showError: (message: string) => void;
  hideError: () => void;
}

export const useApiErrorStore = create<ErrorState>((set) => ({
  visible: false,
  message: '',
  showError: (message: string) => set({ visible: true, message }),
  hideError: () => set({ visible: false, message: '' }),
}));
