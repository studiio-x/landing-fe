interface PriceToggleProps {
  isMonthly: boolean;
  onToggle: () => void;
  yearlyLabel: string;
  monthlyLabel: string;
}

const PriceToggle = ({
  isMonthly,
  onToggle,
  yearlyLabel,
  monthlyLabel,
}: PriceToggleProps) => {
  return (
    <div className="flex mb-3 gap-3 items-center">
      <div
        className={`Body_1_semibold ${isMonthly ? "text-Grey-500" : "text-Grey-100"}`}
      >
        {yearlyLabel}
      </div>
      <button
        onClick={onToggle}
        className="w-[4.5rem] h-9 rounded-full bg-Grey-600 relative"
        aria-label={isMonthly ? monthlyLabel : yearlyLabel}
      >
        <div
          className={`absolute w-7 h-7 bg-white rounded-full transition-transform duration-300 top-1/2 -translate-y-1/2 left-0 ${
            isMonthly ? "translate-x-10" : "translate-x-1"
          }`}
        />
      </button>
      <div
        className={`Body_1_semibold ${isMonthly ? "text-Grey-100" : "text-Grey-500"}`}
      >
        {monthlyLabel}
      </div>
    </div>
  );
};

export default PriceToggle;
