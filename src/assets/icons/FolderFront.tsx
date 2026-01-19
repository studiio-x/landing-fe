import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgFolderFront = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 306 93"
    role="img"
    focusable="false"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <foreignObject width={345.473} height={133} x={-20} y={-20}>
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          backdropFilter: "blur(0)",
          clipPath: "url(#folderFront_svg__a)",
          height: "100%",
          width: "100%",
        }}
      />
    </foreignObject>
    <path
      fill="#16181D"
      fillOpacity={0.9}
      stroke="url(#folderFront_svg__b)"
      d="M35.219.5h262.248c5.088 0 8.7 4.96 7.138 9.803l-25.734 79.771a3.5 3.5 0 0 1-3.331 2.426H4.003c-2.389 0-4.075-2.34-3.32-4.606L28.105 5.628A7.5 7.5 0 0 1 35.219.5Z"
      data-figma-bg-blur-radius={0}
    />
    <defs>
      <linearGradient
        id="folderFront_svg__b"
        x1={153.453}
        x2={153.453}
        y1={-26.383}
        y2={93}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#808A9D" />
        <stop offset={1} stopColor="#282C34" />
      </linearGradient>
      <clipPath id="folderFront_svg__a" transform="translate(20 20)">
        <path d="M35.219.5h262.248c5.088 0 8.7 4.96 7.138 9.803l-25.734 79.771a3.5 3.5 0 0 1-3.331 2.426H4.003c-2.389 0-4.075-2.34-3.32-4.606L28.105 5.628A7.5 7.5 0 0 1 35.219.5" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgFolderFront);
export default Memo;
