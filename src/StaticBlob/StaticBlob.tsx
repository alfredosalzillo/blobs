import type React from "react";
import clsx from "clsx";
import type { BlobDescriptor, EyeDescriptor, Palette } from "../generate-blob";
import spline from "../spline";
import classes from "./StaticBlob.module.scss";

export type StaticBlobClassNames = {
  root?: string;
  eye?: string;
  iris?: string;
  pupil?: string;
};

type EyeProps = EyeDescriptor & {
  colors: Palette;
  classNames?: StaticBlobClassNames;
};

const Eye: React.FC<EyeProps> = ({ classNames, colors, size, x, y }) => (
  <g
    transform={`matrix(1,0,0,1,${x},${y})`}
    className={clsx(classes.eye, classNames?.eye)}
  >
    <circle
      r={size}
      cx="0"
      cy="0"
      strokeWidth="2"
      stroke={colors.dark}
      fill={colors.light}
      className={clsx(classes.iris, classNames?.iris)}
    />
    <circle
      r={size / 2}
      cx="0"
      cy="0"
      fill={colors.dark}
      className={clsx(classes.pupil, classNames?.pupil)}
      style={{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        "--radius": `${size / 2}px`,
      }}
    />
  </g>
);

export type StaticBlobProps = Pick<
  BlobDescriptor,
  "body" | "colors" | "eyes" | "height" | "width"
> & {
  className?: string;
  classNames?: StaticBlobClassNames;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  onAnimationEnd?: React.AnimationEventHandler<SVGSVGElement>;
};

const StaticBlob: React.FC<StaticBlobProps> = ({
  body,
  className,
  classNames,
  colors,
  eyes,
  height,
  onAnimationEnd,
  onClick,
  width,
}) => (
  // biome-ignore lint/a11y/noSvgWithoutTitle: allowed
  // biome-ignore lint/a11y/useKeyWithClickEvents: allowed
  <svg
    viewBox={`0 0 ${width} ${height}`}
    className={clsx(classes.root, classNames?.root, className)}
    onClick={onClick}
    onAnimationEnd={onAnimationEnd}
  >
    <path
      d={spline(body, 1, true)}
      strokeWidth={2}
      stroke={colors.dark}
      fill={colors.primary}
    />
    <g>
      {eyes.map((eye) => (
        <Eye
          key={[eye.x, eye.y, eye.size].join("-")}
          {...eye}
          colors={colors}
          classNames={classNames}
        />
      ))}
    </g>
  </svg>
);

export default StaticBlob;
