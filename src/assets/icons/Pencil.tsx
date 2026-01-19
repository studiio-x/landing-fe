import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPencil = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18 18"
    role="img"
    focusable="false"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#F1F4F8"
      d="M1.486 17.955q-.425.117-.803-.071a1.24 1.24 0 0 1-.567-.567 1.09 1.09 0 0 1-.07-.802l.897-3.636L12.983.862q.566-.567 1.299-.756a2.57 2.57 0 0 1 1.463 0q.732.189 1.299.756l.094.094q.567.566.756 1.299.211.732 0 1.463-.189.732-.756 1.299L5.121 17.057zm.377-.945a.5.5 0 0 0 0-.212 1.7 1.7 0 0 0-.047-.354 2.7 2.7 0 0 0-.142-.473l2.456-.613L15.816 3.695q.378-.378.378-.708t-.378-.709l-.094-.094q-.378-.378-.708-.378t-.709.378L2.642 13.87zM11.52 3.648l1.322-1.323 2.834 2.834-1.323 1.322z"
    />
  </svg>
);
const Memo = memo(SvgPencil);
export default Memo;
