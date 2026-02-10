"use client";

import { useEffect } from "react";

interface ModalOverlayProps {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const ModalOverlay = ({
  onClose,
  children,
  className = "bg-Black/50",
}: ModalOverlayProps) => {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={`absolute inset-0 ${className}`}
        onClick={onClose}
        aria-label="close overlay"
      />
      <div role="dialog" aria-modal="true" className="relative">
        {children}
      </div>
    </div>
  );
};

export default ModalOverlay;
