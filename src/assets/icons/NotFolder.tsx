import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgNotFolder = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 308 200"
    role="img"
    focusable="false"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#1D2025"
      d="M0 8a8 8 0 0 1 8-8h292a8 8 0 0 1 8 8v184a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8z"
    />
    <path
      stroke="url(#notFolder_svg__a)"
      strokeOpacity={0.35}
      d="M8 .5h292a7.5 7.5 0 0 1 7.5 7.5v184a7.5 7.5 0 0 1-7.5 7.5H8A7.5 7.5 0 0 1 .5 192V8A7.5 7.5 0 0 1 8 .5Z"
    />
    <defs>
      <linearGradient
        id="notFolder_svg__a"
        x1={154}
        x2={154}
        y1={0}
        y2={200}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="currentColor" />
      </linearGradient>
    </defs>
  </svg>
);
const Memo = memo(SvgNotFolder);
export default Memo;
