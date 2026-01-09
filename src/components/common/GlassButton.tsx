import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type GlassButtonVariant = "default" | "red";
type GlassButtonSize = "xl" | "lg" | "md" | "sm";
type GlassButtonGap = "sm" | "md" | "lg";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: GlassButtonVariant;
  size?: GlassButtonSize;
  gap?: GlassButtonGap;
  leftIcon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const SIZE_CLASS: Record<GlassButtonSize, string> = {
  xl: "w-[22.25rem] h-[3rem]", // 356px × 48px
  lg: "w-[14.125rem] h-[3.0625rem]", // 226px × 49px
  md: "w-[11.875rem] h-[3.25rem]", // 190px × 52px
  sm: "w-[10rem] h-[2.75rem]", // 160px × 44px
};

const GAP_CLASS: Record<GlassButtonGap, string> = {
  sm: "gap-[0.5rem]", // 0.5
  md: "gap-[0.62rem]", // 0.62
  lg: "gap-[0.75rem]", // 0.75
};

const VARIANT_CLASS: Record<GlassButtonVariant, string> = {
  default: "bg-Grey-500/20 text-Grey-50 hover:bg-Grey-500/75",
  red: "bg-Red-500/45 text-White hover:bg-Red-500/75",
};

const DISABLED_CLASS = "bg-Grey-600/45 text-Grey-500";

const GlassButton = ({
  children,
  variant = "default",
  size = "md",
  gap = "md",
  leftIcon,
  fullWidth = false,
  className,
  disabled,
  type = "button",
  ...props
}: GlassButtonProps) => {
  return (
    <button
      {...props}
      type={type}
      className={clsx(
        "relative flex items-center justify-center rounded overflow-hidden",
        "shadow-[0_1px_8px_rgba(18,18,18,0.12)]",
        "transition-colors",

        SIZE_CLASS[size],
        GAP_CLASS[gap],
        disabled ? DISABLED_CLASS : VARIANT_CLASS[variant],

        fullWidth && "w-full",

        className
      )}
    >
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          border: "0.9px solid transparent",
          backgroundImage: `
            radial-gradient(120% 120% at 0% 0%, rgba(255,255,255,0.36), rgba(255,255,255,0.00) 55%),
            radial-gradient(120% 120% at 100% 0%, rgba(255,255,255,0.36), rgba(255,255,255,0.00) 55%),
            radial-gradient(120% 120% at 100% 100%, rgba(255,255,255,0.36), rgba(255,255,255,0.00) 55%),
            radial-gradient(120% 120% at 0% 100%, rgba(255,255,255,0.36), rgba(255,255,255,0.00) 55%)
            `,
          backgroundOrigin: "border-box",
          backgroundClip: "border-box",
          WebkitMask:
            "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-30"></div>

      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      {children}
    </button>
  );
};

export default GlassButton;
