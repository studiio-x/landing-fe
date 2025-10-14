import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
  width?: string;
  height?: string;
}
const SvgClose = ({
  title,
  titleId,
  width,
  height,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 25 25"
    className="mx-auto block w-[0.44rem] h-[0.44rem] lg:w-[0.44rem] lg:h-[0.44rem] 2xl:w-[1.5rem] 2xl:h-[1.5rem]"
    role="img"
    focusable="false"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#626B7F"
      d="M6.2 20.2q-.425.425-.95.25a1.13 1.13 0 0 1-.725-.675q-.175-.525.275-.975l14-14q.425-.425.95-.25t.7.7q.2.5-.25.95zm-1.4-14q-.45-.45-.275-.95.175-.525.7-.7.55-.175.975.25l14 14q.425.425.25.95t-.7.725q-.5.175-.95-.275z"
    />
  </svg>
);
const Memo = memo(SvgClose);
export default Memo;
