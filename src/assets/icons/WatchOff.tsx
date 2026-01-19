import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgWatchOff = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    role="img"
    focusable="false"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <mask
      id="watch-off_svg__a"
      width={22}
      height={20}
      x={1}
      y={1}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2 12c1.72-3.83 5.53-6.5 10-6.5s8.28 2.67 10 6.5c-1.72 3.83-5.53 6.5-10 6.5S3.72 15.83 2 12"
      />
      <path fill="#fff" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m4.222 2.808 16.97 16.97"
      />
    </mask>
    <g mask="url(#watch-off_svg__a)">
      <path fill="currentColor" d="M0 0h24v24H0z" />
    </g>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m2.808 4.222 16.97 16.97"
    />
  </svg>
);
const Memo = memo(SvgWatchOff);
export default Memo;
