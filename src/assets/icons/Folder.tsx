import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgFolder = ({
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
      d="M0 8a8 8 0 0 1 8-8h122.204a8 8 0 0 1 6.197 2.941l15.198 18.618a8 8 0 0 0 6.197 2.941H300a8 8 0 0 1 8 8V192a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8z"
    />
    <path
      fill="url(#folder_svg__a)"
      fillOpacity={0.15}
      d="M0 8a8 8 0 0 1 8-8h122.204a8 8 0 0 1 6.197 2.941l15.198 18.618a8 8 0 0 0 6.197 2.941H300a8 8 0 0 1 8 8V192a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8z"
    />
    <path
      stroke="url(#folder_svg__b)"
      strokeOpacity={0.6}
      d="M8 .5h122.203a7.5 7.5 0 0 1 5.811 2.757l15.198 18.618A8.5 8.5 0 0 0 157.797 25H300a7.5 7.5 0 0 1 7.5 7.5V192a7.5 7.5 0 0 1-7.5 7.5H8A7.5 7.5 0 0 1 .5 192V8A7.5 7.5 0 0 1 8 .5Z"
    />
    <defs>
      <linearGradient
        id="folder_svg__a"
        x1={265}
        x2={1.5}
        y1={200}
        y2={3.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF5252" />
        <stop offset={0.324} stopColor="#1D2025" />
      </linearGradient>
      <linearGradient
        id="folder_svg__b"
        x1={154}
        x2={154}
        y1={0}
        y2={200}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="#282C34" />
      </linearGradient>
    </defs>
  </svg>
);
const Memo = memo(SvgFolder);
export default Memo;
