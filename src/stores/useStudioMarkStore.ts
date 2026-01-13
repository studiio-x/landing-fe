import { create } from "zustand";

type MarkRect = { id: string; x: number; y: number; w: number; h: number };

interface StudioMarkState {
  isMarkMode: boolean;
  rects: MarkRect[];
  setMarkMode: (v: boolean) => void;
  addRect: (r: MarkRect) => void;
  setRects: (r: MarkRect[]) => void;
  reset: () => void;
}

export const useStudioMarkStore = create<StudioMarkState>((set) => ({
  isMarkMode: false,
  rects: [],
  setMarkMode: (v) => set({ isMarkMode: v }),
  addRect: (r) => set((s) => ({ rects: [...s.rects, r] })),
  setRects: (r) => set({ rects: r }),
  reset: () => set({ isMarkMode: false, rects: [] }),
}));
