interface MeatballModalProps {
  isFolder: boolean;
  folderId: number;
  isSubFolder: boolean;
  setDeleteTargetId: (folderId: number | null) => void;
  setRenameModalOpen: (open: boolean) => void;
  onUnlink?: () => void;
  meatballRef: React.RefObject<HTMLDivElement | null>;
}

const MeatballModal = ({
  isFolder,
  folderId,
  isSubFolder,
  setDeleteTargetId,
  setRenameModalOpen,
  onUnlink,
  meatballRef,
}: MeatballModalProps) => {
  return (
    <div
      className={`${isFolder ? "bg-[rgba(255,255,255,0.12)] backdrop-blur-[10px]" : "bg-Grey-600"} Body_2_medium text-Grey-100 rounded py-[0.63rem] px-3 flex flex-col justify-center items-center gap-2 absolute bottom-7 right-1 z-10`}
      ref={meatballRef}
    >
      <button
        type="button"
        onClick={() => setDeleteTargetId(folderId)}
        className="cursor-pointer"
      >
        삭제하기
      </button>
      <span className="bg-Grey-500 h-px w-21"></span>
      <button type="button" onClick={() => setRenameModalOpen(true)}>
        이름 바꾸기
      </button>
      {isSubFolder && onUnlink && (
        <>
          <span className="bg-Grey-500 h-px w-21"></span>
          <button
            type="button"
            onClick={onUnlink}
            className="cursor-pointer whitespace-nowrap"
          >
            연결 해제
          </button>
        </>
      )}
    </div>
  );
};

export default MeatballModal;
