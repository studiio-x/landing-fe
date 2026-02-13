import { Close } from "@/assets/icons";
import GlassButton from "@/components/common/GlassButton";
import ModalOverlay from "@/components/common/ModalOverlay";
import { type ReactNode } from "react";

interface AlertModalButton {
  label: string;
  variant?: "default" | "red";
  onClick: () => void;
}

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: ReactNode;
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
  if (!isOpen) return null;

  const modalContent = (
    <div className="flex flex-col items-start gap-2.5 pb-9 px-11 relative bg-[#272b33e6] rounded-[0.5rem] backdrop-blur-sm shadow-[0_0_12px_0_rgba(8,8,8,0.25)]">
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
          aria-label="닫기"
          type="button"
        >
          <Close className="w-6 h-6 text-Grey-300" />
        </button>
      </header>

      <div className="flex flex-col w-[26rem] items-center gap-8 relative flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 self-stretch w-full relative flex-[0_0_auto]">
          <div className="w-full h-[0.0625rem] bg-Grey-600" />

          <p
            id="modal-description"
            className="self-stretch text-Grey-300 Body_1_medium whitespace-pre-line"
          >
            {description}
          </p>
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
