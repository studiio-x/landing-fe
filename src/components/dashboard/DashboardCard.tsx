import Image from "next/image";

interface DashboardCardProps {
  title: string;
  content: string;
  imageSrc: string;
}

const DashboardCard = ({ title, content, imageSrc }: DashboardCardProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className="h-[12.5rem] w-[19.25rem] group rounded bg-gradient-to-b from-Grey-300 to-Grey-700 p-px cursor-pointer hover:from-Red-350 hover:to-Red-500"
    >
      <div className="h-full w-full rounded bg-Grey-800 overflow-hidden flex">
        <div className="pl-5 flex flex-col py-5 justify-between w-[7.3125rem]">
          <h3 className="Body_1_semibold text-white whitespace-pre-line group-hover:text-Red-300">
            {title}
          </h3>
          <span className="text-Grey-400 Caption_medium whitespace-pre-line">
            {content}
          </span>
        </div>

        <div className="relative h-full w-[11.9375rem] shrink-0">
          <Image src={imageSrc} alt={title} fill className="object-cover" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
