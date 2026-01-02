import { useRouter } from "next/navigation";

const OpenBtn = ({ width }: { width?: string }) => {
  const router = useRouter();

  return (
    <button
      onClick={()=> router.push('/dashboard')}
      className={`${width ? width : "w-fit"} h-fit rounded-[2.25rem] bg-gradient-to-b from-[#F1F4F8]/50 to-[#1D2025]/50 p-[1px]`}
    >
      <div className="Body_2_semibold flex items-center justify-center rounded-[2.25rem] bg-[rgb(23,24,27)] px-6 py-3 text-White">
        Open StudioX
      </div>
    </button>
  );
};

export default OpenBtn;
