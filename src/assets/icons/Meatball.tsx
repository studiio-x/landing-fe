import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgMeatball = ({
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
    <path
      fill="currentColor"
      d="M14 12a2 2 0 0 1-.575 1.425Q12.85 14 12 14a2 2 0 0 1-1.425-.575A2 2 0 0 1 10 12q0-.85.575-1.425A2 2 0 0 1 12 10q.85 0 1.425.575T14 12m0-7a2 2 0 0 1-.575 1.425Q12.85 7 12 7a2 2 0 0 1-1.425-.575A2 2 0 0 1 10 5q0-.85.575-1.425A2 2 0 0 1 12 3q.85 0 1.425.575Q14 4.149 14 5m0 14a2 2 0 0 1-.575 1.425Q12.85 21 12 21a2 2 0 0 1-1.425-.575A2 2 0 0 1 10 19q0-.85.575-1.425A2 2 0 0 1 12 17q.85 0 1.425.575Q14 18.149 14 19"
    />
  </svg>
);
const Memo = memo(SvgMeatball);
export default Memo;
