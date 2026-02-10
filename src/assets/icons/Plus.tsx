import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPlus = ({
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
      fill="#A9B4C6"
      d="M3.99 12.996q-.627 0-.877-.501a1.17 1.17 0 0 1 0-1.002q.25-.501.877-.501h16.033q.626 0 .852.5.25.502 0 1.003-.225.5-.852.5zm7.014-9.019q0-.625.501-.852a1.07 1.07 0 0 1 1.002 0q.501.225.501.852V20.01q0 .627-.5.877a1.17 1.17 0 0 1-1.003 0q-.5-.25-.5-.877z"
    />
  </svg>
);
const Memo = memo(SvgPlus);
export default Memo;
