import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBackArrow = ({
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
      fill="currentColor"
      fillRule="evenodd"
      d="M2.862 12.636a.9.9 0 0 1 0-1.272l7-7a.9.9 0 1 1 1.273 1.272L5.67 11.1H20.5a.9.9 0 1 1 0 1.8H5.67l5.464 5.463a.9.9 0 1 1-1.273 1.273z"
      clipRule="evenodd"
    />
  </svg>
);
const Memo = memo(SvgBackArrow);
export default Memo;
