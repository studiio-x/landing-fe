const MeatballModal = ({ isFolder }: { isFolder: boolean }) => {
  return (
    <div
      className={`${isFolder ? "bg-[rgba(255,255,255,0.12)]" : "bg-Grey-600"} Body_2_medium text-Grey-100 rounded py-[0.63rem] px-[0.75rem] flex flex-col justify-center items-center gap-2 absolute bottom-7 right-1`}
    >
      <span>삭제하기</span>
      <span className="bg-Grey-500 h-[0.0625rem] w-[5.25rem]"></span>
      <span>이름 바꾸기</span>
    </div>
  );
};

export default MeatballModal;
