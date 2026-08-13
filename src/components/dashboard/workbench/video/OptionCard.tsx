import clsx from "clsx";

interface OptionCardProps {
  label: string;
  onClick: () => void;
  isSelected?: boolean;
  imageUrl?: string;
}

const OptionCard = ({
  label,
  onClick,
  isSelected = false,
  imageUrl,
}: OptionCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      className="group relative w-31 h-40 rounded overflow-hidden"
    >
      <div
        className={clsx(
          "absolute inset-0 rounded p-px",
          "bg-linear-to-b from-Red-300 to-Red-500",
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        )}
      />

      <div className="absolute inset-px rounded bg-Grey-800 flex flex-col">
        <div className="h-31 w-full bg-Grey-700 rounded-t overflow-hidden">
          {imageUrl && (
            <video
              src={imageUrl}
              className="h-full w-full object-cover"
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
            />
          )}
        </div>

        <div
          className={clsx(
            "flex-1 px-2.5 py-2 flex justify-center items-center rounded-b",
            isSelected
              ? "bg-linear-to-b from-Grey-700 to-Red-500/70"
              : "bg-Grey-800 group-hover:bg-linear-to-b group-hover:from-Grey-700 group-hover:to-Red-500/70",
          )}
        >
          <span
            className={clsx(
              "Body_3_medium",
              isSelected
                ? "text-White"
                : "text-Grey-200 group-hover:text-White",
            )}
          >
            {label}
          </span>
        </div>
      </div>
    </button>
  );
};

export default OptionCard;
