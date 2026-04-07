import { Close } from "@/assets/icons";
import GlassButton from "@/components/common/GlassButton";
import ModalOverlay from "@/components/common/ModalOverlay";
import { useEffect, type ReactNode } from "react";

interface AlertModalButton {
  label: string;
  variant?: "default" | "red";
  onClick: () => void;
}

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: ReactNode | ReactNode[];
  buttons: AlertModalButton[];
  contained?: boolean;
}

const AlertModal = ({
  isOpen,
  onClose,
  title,
  description,
  buttons,
  contained = false,
}: AlertModalProps) => {
  // contained 모드에서도 Escape 및 스크롤 잠금 적용
 useEffect(() => {
    if (!contained) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
     if (e.key === "Escape") onClose();
    };
   window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [contained, onClose]);

  if (!isOpen) return null;
  
  const modalContent = (
    <div className="flex flex-col items-start gap-3 pb-9 px-11 relative bg-Grey-700/90 rounded-[0.5rem] backdrop-blur-sm shadow-[0_0_12px_0_rgba(8,8,8,0.25)]">
      <header className="flex items-start justify-between pt-7 self-stretch w-full">
        <h2
          id="modal-title"
          className="w-fit Subhead_1_semibold text-left whitespace-nowrap"
        >
          {title}
        </h2>

        <button
          onClick={onClose}
          className="absolute right-5 top-6 !aspect-[1] cursor-pointer"
          aria-label="Close"
          type="button"
        >
          <Close className="w-6 h-6 text-Grey-300" />
        </button>
      </header>

      <div className="flex flex-col w-[26rem] items-center gap-8 relative flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 self-stretch w-full relative flex-[0_0_auto]">
          <div className="w-full h-[0.0625rem] bg-Grey-600" />

          {Array.isArray(description) ? (
            <div id="modal-description" className="flex flex-col gap-3 self-stretch">
              {description.map((desc, i) => (
                <p key={i} className="text-Grey-300 Body_1_medium whitespace-pre-line">
                  {desc}
                </p>
              ))}
            </div>
          ) : (
            <p
              id="modal-description"
              className="self-stretch text-Grey-300 Body_1_medium whitespace-pre-line"
            >
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 self-stretch w-full Body_2_semibold">
          {buttons.map((button) => (
            <GlassButton
              key={button.label}
              variant={button.variant ?? "default"}
              onClick={button.onClick}
              className="flex items-center justify-center flex-1 grow !h-[2.9375rem]"
              type="button"
            >
              {button.label}
            </GlassButton>
          ))}
        </div>
      </div>
    </div>
  );

  if (contained) {
    return (
      <>
        <div
          className="fixed inset-0 z-50 bg-Black/50"
          onClick={onClose}
          aria-label="close overlay"
        />
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div role="dialog" aria-modal="true" className="relative pointer-events-auto">
            {modalContent}
          </div>
        </div>
      </>
    );
  }

  return (
    <ModalOverlay onClose={onClose}>
      {modalContent}
    </ModalOverlay>
  );
};

export default AlertModal;
