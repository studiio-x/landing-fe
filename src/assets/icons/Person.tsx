import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPerson = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 19 19"
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
      d="M3.733 18.667q-1.75 0-2.753-.98Q0 16.683 0 14.933v-.093q0-1.377 1.283-2.403 1.284-1.05 3.407-1.61t4.643-.56 4.644.56 3.406 1.61q1.284 1.026 1.284 2.403v.093q0 1.75-1.004 2.754-.98.98-2.73.98zm-1.866-3.734q0 1.074.396 1.47.397.397 1.47.397h11.2q1.074 0 1.47-.397.397-.396.397-1.47v-.093q0-.723-.957-1.353-.956-.63-2.66-.98-1.68-.375-3.85-.374-2.145 0-3.85.374-1.703.35-2.66.98-.956.63-.956 1.353zm7.466-5.6q-1.282 0-2.356-.63-1.05-.63-1.68-1.68a4.57 4.57 0 0 1-.63-2.356q0-1.283.63-2.357A4.6 4.6 0 0 1 6.977.63 4.57 4.57 0 0 1 9.333 0q1.284 0 2.357.63a4.36 4.36 0 0 1 1.68 1.68Q14 3.383 14 4.667q0 1.282-.63 2.356a4.6 4.6 0 0 1-1.68 1.68q-1.073.63-2.357.63m0-1.866q.84 0 1.47-.35t.98-.98.35-1.47-.35-1.47a2.48 2.48 0 0 0-.98-.98q-.63-.35-1.47-.35t-1.47.35-.98.98-.35 1.47.35 1.47.98.98 1.47.35"
    />
  </svg>
);
const Memo = memo(SvgPerson);
export default Memo;
