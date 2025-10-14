const OpenBtn = ({ width }: { width?: string }) => {
  return (
    <a
      href={process.env.NEXT_PUBLIC_STUDIOX_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${width ? width : "w-fit"} h-fit rounded-[2.25rem] bg-gradient-to-b from-[#F1F4F8]/50 to-[#1D2025]/50 p-[1px]`}
    >
      <div className="Body_2_semibold flex items-center justify-center rounded-[2.25rem] bg-[rgb(23,24,27)] px-6 py-3 text-White">
        Open StudioX
      </div>
    </a>
  );
};

export default OpenBtn;
