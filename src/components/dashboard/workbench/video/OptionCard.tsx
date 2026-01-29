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
      className="group relative w-[7.75rem] h-40 rounded overflow-hidden"
    >
      <div
        className={clsx(
          "absolute inset-0 rounded p-px",
          "bg-gradient-to-b from-Red-300 to-Red-500",
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        )}
      />

      <div className="absolute inset-px rounded bg-Grey-800 flex flex-col">
        <div className="h-[7.75rem] w-full bg-Grey-700 rounded-t">
          {imageUrl && (
            <img
              src={imageUrl}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          )}
        </div>

        <div
          className={clsx(
            "flex-1 px-[0.625rem] py-2 flex justify-center items-center rounded-b",
            isSelected
              ? "bg-gradient-to-b from-Grey-700 to-Red-500/70"
              : "bg-Grey-800 group-hover:bg-gradient-to-b group-hover:from-Grey-700 group-hover:to-Red-500/70",
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
