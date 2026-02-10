import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgScissor = ({
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
      fill="white"
      d="m13.291 12 7.465-7.484c.117-.117.035-.32-.131-.32h-2.121a.18.18 0 0 0-.131.053l-6.406 6.422L9.853 8.55a3.564 3.564 0 0 0-3.1-5.316A3.564 3.564 0 0 0 3.19 6.797 3.564 3.564 0 0 0 8.53 9.884L10.641 12l-2.112 2.116a3.564 3.564 0 0 0-5.341 3.087 3.564 3.564 0 0 0 3.562 3.563 3.564 3.564 0 0 0 3.1-5.316l2.115-2.121 6.405 6.422a.19.19 0 0 0 .132.054h2.123c.166 0 .25-.202.131-.321zM6.75 8.672a1.877 1.877 0 0 1-1.875-1.875c0-1.034.841-1.875 1.875-1.875s1.875.841 1.875 1.875A1.877 1.877 0 0 1 6.75 8.672m0 10.406a1.877 1.877 0 0 1-1.875-1.875c0-1.033.841-1.875 1.875-1.875s1.875.841 1.875 1.875a1.877 1.877 0 0 1-1.875 1.875"
    />
  </svg>
);
const Memo = memo(SvgScissor);
export default Memo;
