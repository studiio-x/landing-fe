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
    viewBox="0 0 16 16"
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
      fill="white"
      d="M.88 8.885q-.557 0-.78-.445a1.04 1.04 0 0 1 0-.89q.223-.446.78-.446h14.252q.555 0 .757.445a.95.95 0 0 1 0 .89q-.2.447-.757.446zM7.115.868q0-.555.445-.757a.95.95 0 0 1 .89 0q.447.2.446.757V15.12q0 .557-.445.78a1.04 1.04 0 0 1-.89 0q-.447-.223-.446-.78z"
    />
  </svg>
);
const Memo = memo(SvgPlus);
export default Memo;
