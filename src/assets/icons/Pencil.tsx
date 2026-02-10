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
    viewBox="0 0 12 12"
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
      fill="#D8DFE9"
      d="M.99 11.97a.72.72 0 0 1-.535-.048.82.82 0 0 1-.378-.377.72.72 0 0 1-.047-.535l.598-2.424L8.655.574q.377-.377.866-.503.487-.143.976 0 .488.126.866.503l.063.063q.377.377.503.866.143.487 0 .976a1.87 1.87 0 0 1-.504.866l-8.01 8.027zm.252-.63a.3.3 0 0 0 0-.142q0-.093-.031-.236a2 2 0 0 0-.095-.314l1.637-.41 7.791-7.775q.252-.252.252-.472t-.252-.472l-.063-.063q-.252-.252-.472-.252t-.472.252l-7.775 7.79zM7.68 2.432l.881-.882L10.45 3.44l-.882.881z"
    />
  </svg>
);
const Memo = memo(SvgPencil);
export default Memo;
