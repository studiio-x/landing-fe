import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSend = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    role="img"
    focusable="false"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#A9B4C6"
      d="M10.809 12.983q.275.4.275.45l2.6 5.1q-.05.15-.025.225a.3.3 0 0 0 .05.075q.05 0 .075-.05l4.8-13.4q.15-.05.125-.1 0-.074-.075-.05L5.359 9.858q-.125-.075-.125 0 0 .051.1 0zm-6.425-1.375q-.725-.4-.95-1.15-.2-.75.125-1.45a2 2 0 0 1 1.125-1.025l13.275-4.625q.8-.249 1.5.075.7.3 1 1.025.325.7.075 1.475l-4.875 13.5q-.3.801-1.025 1.125-.726.325-1.5.1-.75-.25-1.125-1.025l-2.025-3.95q-.85-1.7-.7-1.475.125.275.2.35z"
    />
  </svg>
);
const Memo = memo(SvgSend);
export default Memo;
