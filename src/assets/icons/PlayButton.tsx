import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPlayButton = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 28 28"
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
      fill="#626B7F"
      d="M14 23.8a9.5 9.5 0 0 1-4.9-1.323A9.9 9.9 0 0 1 5.523 18.9 9.5 9.5 0 0 1 4.2 14a9.5 9.5 0 0 1 1.323-4.9A9.64 9.64 0 0 1 9.1 5.523 9.5 9.5 0 0 1 14 4.2a9.5 9.5 0 0 1 4.9 1.323A9.4 9.4 0 0 1 22.477 9.1 9.5 9.5 0 0 1 23.8 14a9.5 9.5 0 0 1-1.323 4.9 9.64 9.64 0 0 1-3.577 3.577A9.5 9.5 0 0 1 14 23.8m0-1.96q2.181 0 3.969-1.029a7.5 7.5 0 0 0 2.842-2.817Q21.84 16.18 21.84 14t-1.029-3.969a7.4 7.4 0 0 0-2.842-2.842Q16.181 6.16 14 6.16t-3.993 1.03a7.5 7.5 0 0 0-2.818 2.841Q6.16 11.82 6.16 14.001q0 2.18 1.029 3.993a7.5 7.5 0 0 0 2.818 2.817q1.813 1.03 3.993 1.03m3.577-8.893q.417.245.588.661a1 1 0 0 1 0 .809q-.171.391-.588.637l-5.17 2.964q-.44.244-.857.172a1.2 1.2 0 0 1-.71-.417 1.3 1.3 0 0 1-.27-.833v-5.88q0-.514.27-.833.293-.342.71-.416.417-.098.857.171z"
    />
  </svg>
);
const Memo = memo(SvgPlayButton);
export default Memo;
