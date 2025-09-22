import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCheck = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    role="img"
    focusable="false"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#FF7575"
      d="M3.3 11.7q-.45-.45-.275-.95.175-.525.7-.7.55-.175.975.25l5.3 5.275L19.3 6.3q.45-.45.95-.275.525.175.7.725.175.525-.25.95l-9.975 10q-.325.325-.725.325t-.725-.325z"
    />
  </svg>
);
const Memo = memo(SvgCheck);
export default Memo;
