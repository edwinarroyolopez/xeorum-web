import { create } from 'zustand';

type UiState = {
  isNavOpen: boolean;
  openNav: () => void;
  closeNav: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  isNavOpen: false,
  openNav: () => set({ isNavOpen: true }),
  closeNav: () => set({ isNavOpen: false }),
}));
