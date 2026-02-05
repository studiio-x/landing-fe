import { Close } from "@/assets/icons";
import GlassButton from "@/components/common/GlassButton";

interface DeleteModalProps {
  setIsOpen: (open: boolean) => void;
  handleClose: () => void;
}

export const DeleteModal = ({ setIsOpen, handleClose }: DeleteModalProps) => {
  const handleDelete = () => {
    console.log("Delete action triggered");
    setIsOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="flex flex-col items-start gap-2.5 pb-9  px-11  relative bg-[#272b33e6] rounded-[0.5rem]">
        <header className="flex items-start justify-between pt-7 self-stretch w-full relative">
          <h2
            id="modal-title"
            className="w-fit Subhead_1_semibold text-left whitespace-nowrap relative "
          >
            정말 삭제하시겠습니까?
          </h2>

          <button
            onClick={handleClose}
            className="!relative !w-6 !h-6 !aspect-[1] cursor-pointer"
            aria-label="닫기"
            type="button"
          >
            <Close className="!relative !w-6 !h-6 text-Grey-300" />
          </button>
        </header>

        <div className="flex flex-col w-[26rem] items-center gap-8 relative flex-[0_0_auto]">
          <div className="flex flex-col items-start gap-4 self-stretch w-full relative flex-[0_0_auto]">
            {/* <img
                className="relative self-stretch w-full h-px mt-[-1.00px] object-cover"
                alt=""
                src={line523}
                role="presentation"
              /> */}
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
                onClick={handleClose}
                className="items-center gap-2.5 py-3 flex-1 grow bg-opacitywhite-3 rounded flex justify-center relative h-[2.9375rem]"
                type="button"
                aria-label="닫기"
              >
                닫기
              </GlassButton>

              <GlassButton
                onClick={handleDelete}
                className="flex items-center justify-center gap-2.5 px-0 py-3 relative bg-[rgba(255,48,48,0.45)] hover:bg-[rgba(255,48,48,0.75)]  flex-1 grow h-[2.9375rem]rounded"
                type="button"
                aria-label="삭제하기"
              >
                삭제하기
              </GlassButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
