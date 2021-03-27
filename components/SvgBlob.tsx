import React from 'https://esm.sh/react@17.0.1?external=react-dom';
import { Blob, Eye, Palette } from '../lib/blob.ts';
import { spline } from '../lib/spline.ts';

const SvgBlobEye = (props: Eye & { colors: Palette }) => {
  const { x, y, size, colors } = props
  return (
    <g
      transform={`matrix(1,0,0,1,${x},${y})`}
    >
      <circle
        r={size}
        cx="0"
        cy="0"
        stroke-width="2"
        stroke={colors.dark}
        fill={colors.light}
      />
      <circle
        r={size / 2}
        cx="0"
        cy="0"
        fill={colors.dark}
      />
    </g>
  )
}
const animations = ['eye-roll', 'eye-roll-reverse', 'eye-converge', 'eye-converge-reverse'];
export type SvgBlobProps = Blob;
const SvgBlob = ({
   width,
   height,
   body,
   eyes,
   colors,
 }: SvgBlobProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
    >
      <path
        d={spline(body as any[], 1, true)}
        stroke-width={2}
        stroke={colors.dark}
        fill={colors.primary}
      />
      <g>
        ${eyes.map((eye) => <SvgBlobEye {...eye} colors={colors}/>)}
      </g>
    </svg>
  )
}

export default SvgBlob
