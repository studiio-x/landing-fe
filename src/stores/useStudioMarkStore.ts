import { create } from "zustand";
import type { EditRegion } from "@/types/dashboard/mark";

type CommitPaintFn = () => Promise<{ id: string; imageUrl: string } | null>;

interface StudioMarkState {
  isEditMode: boolean;
  setEditMode: (v: boolean) => void;

  hasPaint: boolean;
  setHasPaint: (v: boolean) => void;

  commitPaint: CommitPaintFn | null;
  setCommitPaint: (fn: CommitPaintFn | null) => void;

  editRegions: EditRegion[];
  addEditRegion: (r: EditRegion) => void;

  resetPaint: () => void;
}

export const useStudioMarkStore = create<StudioMarkState>((set) => ({
  isEditMode: false,
  setEditMode: (v) => set({ isEditMode: v }),

  hasPaint: false,
  setHasPaint: (v) => set({ hasPaint: v }),

  commitPaint: null,
  setCommitPaint: (fn) => set({ commitPaint: fn }),

  editRegions: [],
  addEditRegion: (r) => set((s) => ({ editRegions: [...s.editRegions, r] })),

  resetPaint: () => set({ hasPaint: false }),
}));
