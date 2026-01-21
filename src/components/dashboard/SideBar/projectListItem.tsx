import { Down, Up } from "@/assets/icons";
import clsx from "clsx";

interface ProjectListItemProps {
  children: React.ReactNode;
  isShareOpen?: boolean;
  currentSharedProject?: string | null;
  onClick?: () => void;
}

const ProjectListItem = ({
  children,
  isShareOpen,
  onClick,
  currentSharedProject,
  ...props
}: ProjectListItemProps) => {
  return (
    <div
      className="pt-3 pb-2 pl-9 flex items-center gap-2 hover:text-white cursor-pointer"
      onClick={onClick}
      {...props}
    >
      <span className="text-Grey-300">⋅</span>
      <button
        className={clsx(
          "text-Grey-300 hover:text-white transition-colors flex-1 text-left",
          currentSharedProject === "my" && currentSharedProject
            ? "text-white"
            : "text-Grey-300",
        )}
      >
        {children}
      </button>
      {isShareOpen !== undefined &&
        (isShareOpen ? (
          <Up className="text-Grey-300 w-5 h-5" />
        ) : (
          <Down className="text-Grey-300 w-5 h-5" />
        ))}
    </div>
  );
};

export default ProjectListItem;
