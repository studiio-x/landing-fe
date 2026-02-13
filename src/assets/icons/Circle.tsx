import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCircle = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 25 25"
    role="img"
    focusable="false"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#D8DFE9"
      d="M12.5 22.5q-2.7 0-5-1.35a10.1 10.1 0 0 1-3.65-3.65 9.7 9.7 0 0 1-1.35-5q0-2.7 1.35-5A9.83 9.83 0 0 1 7.5 3.85q2.3-1.35 5-1.35t5 1.35a9.6 9.6 0 0 1 3.65 3.65q1.35 2.3 1.35 5t-1.35 5a9.83 9.83 0 0 1-3.65 3.65q-2.3 1.35-5 1.35m0-2q2.224 0 4.05-1.05a7.6 7.6 0 0 0 2.9-2.875q1.05-1.85 1.05-4.075t-1.05-4.05a7.6 7.6 0 0 0-2.9-2.9Q14.724 4.5 12.5 4.5q-2.225 0-4.075 1.05a7.6 7.6 0 0 0-2.875 2.9Q4.5 10.276 4.5 12.5q0 2.225 1.05 4.075a7.7 7.7 0 0 0 2.875 2.875q1.85 1.05 4.075 1.05"
    />
  </svg>
);
const Memo = memo(SvgCircle);
export default Memo;
