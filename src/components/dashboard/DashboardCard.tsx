import clsx from "clsx";
import Image from "next/image";

interface DashboardCardProps {
  title: string;
  content: string;
  mediaSrc: string;
  isActive?: boolean;
}

const DashboardCard = ({
  title,
  content,
  mediaSrc,
  isActive,
}: DashboardCardProps) => {
  const isVideo = (src: string) => /\.(mp4|webm|ogg)$/i.test(src);

  return (
    <div
      role="button"
      tabIndex={0}
      className={clsx(
        "h-[12.5rem] w-[19.25rem] group rounded bg-gradient-to-b p-px cursor-pointer",
        {
          "from-Grey-300 to-Grey-700 hover:from-Red-350 hover:to-Red-500":
            !isActive,
          "from-Red-350 to-Red-500": isActive,
        }
      )}
    >
      <div className="h-full w-full rounded bg-Grey-800 overflow-hidden flex gap-4">
        <div className="pl-[1.1875rem] flex flex-col py-5 justify-between w-[7.3125rem]">
          <h3
            className={clsx(
              "whitespace-pre-line",
              isVideo(mediaSrc) ? "Body_2_semibold" : "Body_1_semibold",
              isActive ? "text-Red-300" : "text-white group-hover:text-Red-300"
            )}
          >
            {title}
          </h3>
          <span className="text-Grey-400 Caption_medium whitespace-pre-line">
            {content}
          </span>
        </div>

        <div className="relative h-full w-[11.875rem] shrink-0">
          {isVideo(mediaSrc) ? (
            <video
              className="h-full w-full object-cover"
              src={mediaSrc}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
            />
          ) : (
            <Image src={mediaSrc} alt={title} fill className="object-cover" />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
