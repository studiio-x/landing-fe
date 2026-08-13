import { create } from "zustand";

interface SessionExpiredState {
  isOpen: boolean;
  pendingRedirectUrl: string | null;
  open: (redirectUrl: string) => void;
  close: () => void;
}

// axios 인터셉터처럼 React 트리 밖에서도 세션 만료 모달을 띄울 수 있도록 zustand로 관리한다.
export const useSessionExpiredStore = create<SessionExpiredState>((set) => ({
  isOpen: false,
  pendingRedirectUrl: null,
  open: (redirectUrl) => set({ isOpen: true, pendingRedirectUrl: redirectUrl }),
  close: () => set({ isOpen: false, pendingRedirectUrl: null }),
}));
