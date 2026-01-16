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
    viewBox="0 0 29 29"
    width="1em"
    height="1em"
    role="img"
    focusable="false"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <foreignObject width={38.5} height={38.5} x={-5.091} y={-5.091}>
      <div
        style={{
          backdropFilter: "blur(2.55px)",
          clipPath: "url(#x__a)",
          height: "100%",
          width: "100%",
        }}
      />
    </foreignObject>
    <g data-figma-bg-blur-radius={5.091}>
      <rect
        width={28}
        height={28}
        fill="#1D2025"
        rx={14}
        transform="matrix(-1 0 0 1 28.16 .16)"
      />
      <rect
        width={28}
        height={28}
        stroke="url(#x__b)"
        strokeWidth={0.318}
        rx={14}
        transform="matrix(-1 0 0 1 28.16 .16)"
      />
      <path
        fill="#A9B4C6"
        fillRule="evenodd"
        d="M8.345 14.564a.573.573 0 0 1 0-.81L12.8 9.299a.573.573 0 1 1 .81.81l-3.477 3.477h9.435a.573.573 0 0 1 0 1.146h-9.435l3.477 3.476a.573.573 0 1 1-.81.81z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <linearGradient
        id="x__b"
        x1={14}
        x2={14.758}
        y1={28}
        y2={-0.537}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1D2025" />
        <stop offset={1} stopColor="#808A9D" />
      </linearGradient>
      <clipPath id="x__a" transform="translate(5.09 5.09)">
        <rect
          width={28}
          height={28}
          rx={14}
          transform="matrix(-1 0 0 1 28.16 .16)"
        />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgBack);
export default Memo;
