import { Close } from "@/assets/icons";
import GlassButton from "@/components/common/GlassButton";

interface DeleteModalProps {
  setIsOpen: (open: boolean) => void;
  onClose: () => void;
}

export const DeleteModal = ({ setIsOpen, onClose }: DeleteModalProps) => {
  const handleDelete = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-start gap-2.5 pb-9 px-11 relative bg-[#272b33e6] rounded-[0.5rem] backdrop-blur-sm shadow-[0_0_12px_0_rgba(8,8,8,0.25)]">
      <header className="flex items-start justify-between pt-7 self-stretch w-full">
        <h2
          id="modal-title"
          className="w-fit Subhead_1_semibold text-left whitespace-nowrap"
        >
          정말 삭제하시겠습니까?
        </h2>

        <button
          onClick={(e) => {
            onClose();
          }}
          className="absolute right-5 top-6 !aspect-[1] cursor-pointer"
          aria-label="닫기"
          type="button"
        >
          <Close className="w-6 h-6 text-Grey-300" />
        </button>
      </header>

      <div className="flex flex-col w-[26rem] items-center gap-8 relative flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 self-stretch w-full relative flex-[0_0_auto]">
          <div className="w-full h-[0.0625rem] bg-Grey-600"></div>

          <div className="flex flex-col items-start gap-2 py-0 self-stretch w-full relative flex-[0_0_auto]">
            <div className="flex flex-col items-start gap-0.5 self-stretch w-full relative flex-[0_0_auto]">
              <p
                id="modal-description"
                className="self-stretch text-Grey-300 relative mt-[-1.00px] Body_1_medium  "
              >
                폴더를 삭제하면 하위의 폴더와 프로젝트가 모두 삭제되며, 복구할
                수 없습니다.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 self-stretch w-full relative flex-[0_0_auto]">
          <div className="flex items-center gap-3 self-stretch w-full relative flex-[0_0_auto] Body_2_semibold ">
            <GlassButton
              variant="default"
              onClick={onClose}
              className="items-center flex-1 grow flex justify-center relative !h-[2.9375rem]"
              type="button"
              aria-label="닫기"
            >
              닫기
            </GlassButton>

            <GlassButton
              variant="red"
              onClick={handleDelete}
              className="flex items-center justify-center relative flex-1 grow !h-[2.9375rem]"
              type="button"
              aria-label="삭제하기"
            >
              삭제하기
            </GlassButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
