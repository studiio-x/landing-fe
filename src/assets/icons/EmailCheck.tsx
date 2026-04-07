import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgEmailCheck = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 64 64"
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
      fill="url(#email-check_svg__a)"
      d="M34.665 50.668c0-.907.107-1.787.24-2.667h-24.24V21.335L32 34.668l21.333-13.333v13.573c1.92.32 3.707.987 5.333 1.92V16.001c0-2.933-2.4-5.333-5.333-5.333H10.665c-2.933 0-5.333 2.4-5.333 5.333v32c0 2.934 2.4 5.334 5.333 5.334h24.24c-.133-.88-.24-1.76-.24-2.667m18.667-34.667L31.999 29.335 10.665 16zm-6 43.094-7.333-8L43.092 48l4.24 4.24 9.573-9.573L60 46.428z"
    />
    <defs>
      <linearGradient
        id="email-check_svg__a"
        x1={32.665}
        x2={32.665}
        y1={10.668}
        y2={59.095}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF8686" />
        <stop offset={1} stopColor="#FF3030" />
      </linearGradient>
    </defs>
  </svg>
);
const Memo = memo(SvgEmailCheck);
export default Memo;
