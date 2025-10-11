import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgMenu = ({
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
      fill="#808A9D"
      d="M4 13q-.625 0-.875-.5a1.17 1.17 0 0 1 0-1q.25-.5.875-.5h16q.625 0 .85.5.25.5 0 1-.225.5-.85.5zm0-7q-.625 0-.875-.5a1.17 1.17 0 0 1 0-1Q3.375 4 4 4h16q.625 0 .85.5.25.5 0 1-.225.5-.85.5zm0 14q-.625 0-.875-.5a1.17 1.17 0 0 1 0-1q.25-.5.875-.5h16q.625 0 .85.5.25.5 0 1-.225.5-.85.5z"
    />
  </svg>
);
const Memo = memo(SvgMenu);
export default Memo;
