import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSearch = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
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
      fill="#A9B4C6"
      d="M9.167 16.25a7.1 7.1 0 0 1-3.563-.937 7.2 7.2 0 0 1-2.583-2.584 7.1 7.1 0 0 1-.938-3.562q0-1.917.938-3.542a7 7 0 0 1 2.583-2.583 6.96 6.96 0 0 1 3.563-.959q1.916 0 3.541.959a6.8 6.8 0 0 1 2.584 2.583 6.85 6.85 0 0 1 .958 3.542q0 1.916-.958 3.562a7 7 0 0 1-2.584 2.584 6.96 6.96 0 0 1-3.541.937m0-1.667q1.541 0 2.77-.687a5 5 0 0 0 1.938-1.938q.708-1.25.708-2.791 0-1.542-.708-2.771a4.8 4.8 0 0 0-1.937-1.938q-1.23-.708-2.771-.708-1.542 0-2.792.708a5 5 0 0 0-1.937 1.938q-.688 1.23-.688 2.77 0 1.542.688 2.792a5.2 5.2 0 0 0 1.937 1.938q1.25.687 2.792.687m3.396-.833 1.187-1.187 3.5 3.52q.355.354.208.792a.94.94 0 0 1-.583.604q-.417.146-.792-.229z"
    />
  </svg>
);
const Memo = memo(SvgSearch);
export default Memo;
