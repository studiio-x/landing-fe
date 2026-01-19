import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgWatch = ({
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
    <path fill="currentColor" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2 12c1.72-3.83 5.53-6.5 10-6.5s8.28 2.67 10 6.5c-1.72 3.83-5.53 6.5-10 6.5S3.72 15.83 2 12"
    />
  </svg>
);
const Memo = memo(SvgWatch);
export default Memo;
