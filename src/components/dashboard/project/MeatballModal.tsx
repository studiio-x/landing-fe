interface MeatballModalProps {
  isFolder: boolean;
  setDeleteModalOpen: (open: boolean) => void;
  setRenameModalOpen: (open: boolean) => void;
  meatballRef: React.RefObject<HTMLDivElement | null>;
}

const MeatballModal = ({
  isFolder,
  setDeleteModalOpen,
  setRenameModalOpen,
  meatballRef,
}: MeatballModalProps) => {
  return (
    <div
      className={`${isFolder ? "bg-[rgba(255,255,255,0.12)] backdrop-blur-[10px]" : "bg-Grey-600"} Body_2_medium text-Grey-100 rounded py-[0.63rem] px-[0.75rem] flex flex-col justify-center items-center gap-2 absolute bottom-7 right-1 z-10`}
      ref={meatballRef}
    >
      <button
        type="button"
        onClick={() => setDeleteModalOpen(true)}
        className="cursor-pointer"
      >
        삭제하기
      </button>
      <span className="bg-Grey-500 h-[0.0625rem] w-[5.25rem]"></span>
      <button type="button" onClick={() => setRenameModalOpen(true)}>
        이름 바꾸기
      </button>
    </div>
  );
};

export default MeatballModal;
