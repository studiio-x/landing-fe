import { create } from "zustand";

export interface ToastItem {
  id: number;
  message: string;
}

interface ToastState {
  toasts: ToastItem[];
  showToast: (message: string) => void;
  dismissToast: (id: number) => void;
}

const TOAST_DURATION_MS = 3000;

let nextToastId = 0;

// 훅/유틸 등 React 컴포넌트 바깥에서도 .getState().showToast(...)로 바로 띄울 수 있는 전역 토스트.
export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  showToast: (message) => {
    const id = nextToastId++;
    set((s) => ({ toasts: [...s.toasts, { id, message }] }));

    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, TOAST_DURATION_MS);
  },
  dismissToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
