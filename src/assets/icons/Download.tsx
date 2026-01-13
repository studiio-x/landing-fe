import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDownload = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 28 28"
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
      d="M27.152 21.156a5.8 5.8 0 0 1-.83 3.016 6 6 0 0 1-2.187 2.225 6 6 0 0 1-3.017.792H6.034a6 6 0 0 1-3.017-.792 6.3 6.3 0 0 1-2.225-2.225A6 6 0 0 1 0 21.156v-1.509q0-.942.754-1.282a1.6 1.6 0 0 1 1.509 0q.754.34.754 1.282v1.509q0 1.395.792 2.225.829.79 2.225.791h15.084q1.396 0 2.187-.791.83-.83.83-2.225v-1.509q0-.716.452-1.093a1.6 1.6 0 0 1 1.056-.378 1.6 1.6 0 0 1 1.056.378q.452.376.452 1.093zM8.598 8.636q-.641.64-1.47.377-.792-.264-1.057-1.018-.263-.793.415-1.471L12.482.49q.49-.49 1.094-.49.603 0 1.093.49l5.996 6.034q.642.641.377 1.47-.263.793-1.056 1.056-.753.264-1.433-.414l-4.977-4.94zm3.47-7.09h3.016v18.101q0 .944-.754 1.32a1.76 1.76 0 0 1-1.508 0q-.755-.377-.755-1.32z"
    />
  </svg>
);
const Memo = memo(SvgDownload);
export default Memo;
