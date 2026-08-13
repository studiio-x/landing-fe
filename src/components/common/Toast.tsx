"use client";

import { useToastStore } from "@/stores/useToastStore";

// 전역 토스트 알림. 레이아웃에 한 번만 마운트해두면 어디서든 useToastStore.getState().showToast(...)로 띄울 수 있다.
const Toast = () => {
  const toasts = useToastStore((s) => s.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-999 flex flex-col gap-2 items-center pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded-md bg-Grey-900 px-6 py-3 Subhead_2_medium text-White text-center whitespace-pre-line shadow-[0_4px_16px_rgba(8,8,8,0.35)] pointer-events-auto"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default Toast;
