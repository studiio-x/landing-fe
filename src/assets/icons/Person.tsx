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
    viewBox="0 0 28 28"
    role="img"
    focusable="false"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#808A9D"
      d="M8.633 23.567q-1.75 0-2.753-.98-.98-1.004-.98-2.753v-.094q0-1.376 1.283-2.403 1.284-1.05 3.407-1.61t4.643-.56 4.644.56 3.406 1.61q1.284 1.027 1.284 2.403v.094q0 1.75-1.004 2.753-.98.98-2.73.98zm-1.866-3.733q0 1.072.396 1.47.397.396 1.47.396h11.2q1.074 0 1.47-.396.397-.398.397-1.47v-.094q0-.723-.957-1.353-.956-.63-2.66-.98-1.68-.373-3.85-.373-2.146 0-3.85.373-1.703.35-2.66.98t-.956 1.353zm7.466-5.6q-1.282 0-2.356-.63-1.05-.63-1.68-1.68a4.57 4.57 0 0 1-.63-2.357q0-1.283.63-2.357a4.6 4.6 0 0 1 1.68-1.68 4.57 4.57 0 0 1 2.356-.63q1.284 0 2.357.63a4.36 4.36 0 0 1 1.68 1.68q.63 1.073.63 2.357 0 1.283-.63 2.357a4.6 4.6 0 0 1-1.68 1.68q-1.073.63-2.357.63m0-1.867q.84 0 1.47-.35t.98-.98.35-1.47-.35-1.47a2.48 2.48 0 0 0-.98-.98q-.63-.35-1.47-.35t-1.47.35-.98.98-.35 1.47.35 1.47.98.98 1.47.35"
    />
  </svg>
);
const Memo = memo(SvgPerson);
export default Memo;
