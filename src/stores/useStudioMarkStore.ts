import { create } from "zustand";
import type { MarkRect } from "@/types/mark";

interface StudioMarkState {
  isMarkMode: boolean;
  rects: MarkRect[];
  setMarkMode: (v: boolean) => void;
  addRect: (r: MarkRect) => void;
  setRects: (r: MarkRect[]) => void;
  clearRects: () => void;
  reset: () => void;
}

export const useStudioMarkStore = create<StudioMarkState>((set) => ({
  isMarkMode: false,
  rects: [],
  setMarkMode: (v) => set({ isMarkMode: v }),
  addRect: (r) => set((s) => ({ rects: [...s.rects, r] })),
  setRects: (r) => set({ rects: r }),
  clearRects: () => set({ rects: [] }),
  reset: () => set({ isMarkMode: false, rects: [] }),
}));
