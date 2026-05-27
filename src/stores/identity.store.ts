import { create } from 'zustand';

type IdentityState = {
  anonymousId: string | null;
  setAnonymousId: (anonymousId: string | null) => void;
};

export const useIdentityStore = create<IdentityState>((set) => ({
  anonymousId: null,
  setAnonymousId: (anonymousId) => set({ anonymousId }),
}));
