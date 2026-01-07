import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBack = ({
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
      fill="#A9B4C6"
      fillRule="evenodd"
      d="M2.864 12.636a.9.9 0 0 1 0-1.273l7-7a.9.9 0 1 1 1.272 1.273L5.673 11.1H20.5a.9.9 0 0 1 0 1.8H5.673l5.463 5.463a.9.9 0 1 1-1.272 1.273z"
      clipRule="evenodd"
    />
  </svg>
);
const Memo = memo(SvgBack);
export default Memo;
