import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgArrow = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 49 48"
    role="img"
    focusable="false"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#353B45"
      d="M.5 24c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24S.5 37.255.5 24"
    />
    <path
      fill="#A9B4C6"
      d="M24.8 17.7q-.425-.425-.25-.95.176-.525.675-.7.525-.2.975.25l7 6.975q.325.325.325.725t-.325.725l-7 6.975q-.425.425-.95.25a1.13 1.13 0 0 1-.725-.675q-.175-.525.275-.975l6.275-6.3zm7.7 5.3v2h-16q-.625 0-.875-.5a1.17 1.17 0 0 1 0-1q.25-.5.875-.5z"
    />
  </svg>
);
const Memo = memo(SvgArrow);
export default Memo;
