import { Watch } from "@/assets/icons";

interface LoginInputProps {
  placeholder: string;
  watch?: boolean;
  ariaLabel: string;
}

const LoginInput = ({
  placeholder,
  watch = false,
  ariaLabel,
}: LoginInputProps) => {
  return (
    //   회원가입에서도 바꾸기
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        className="bg-Grey-800 py-3 px-4 placeholder:text-Grey-400 text-Grey-100 Body_2_medium w-full rounded-[4px]"
        aria-label={ariaLabel}
      />
      {watch && (
        <button
          type="button"
          className="absolute right-4 top-3"
          aria-label={ariaLabel}
        >
          <Watch className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default LoginInput;
