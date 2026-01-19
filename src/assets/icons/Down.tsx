import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDown = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 25"
    role="img"
    focusable="false"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="currentColor"
      d="M18.3 8.8q.45-.45.95-.275.525.175.7.725.175.525-.25.95l-7 7.025q-.325.325-.7.325-.35 0-.7-.325l-7-7.025q-.425-.425-.25-.95a1.05 1.05 0 0 1 .675-.7q.525-.2.975.25l6.3 6.275z"
    />
  </svg>
);
const Memo = memo(SvgDown);
export default Memo;
