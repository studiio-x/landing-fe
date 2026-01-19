import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgFolderBack = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 279 200"
    role="img"
    focusable="false"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#1D2025"
      stroke="url(#folderBack_svg__a)"
      d="M12 .5h63.867c6.351 0 11.5 5.149 11.5 11.5v2a8.5 8.5 0 0 0 8.5 8.5H267c6.351 0 11.5 5.149 11.5 11.5v162a3.5 3.5 0 0 1-3.5 3.5H4A3.5 3.5 0 0 1 .5 196V12C.5 5.649 5.649.5 12 .5Z"
    />
    <defs>
      <linearGradient
        id="folderBack_svg__a"
        x1={139.5}
        x2={139.5}
        y1={0}
        y2={200}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#808A9D" />
        <stop offset={1} stopColor="#282C34" />
      </linearGradient>
    </defs>
  </svg>
);
const Memo = memo(SvgFolderBack);
export default Memo;
