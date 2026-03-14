"use client";

import type React from "react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import type { BlobDescriptor } from "../generate-blob";
import { random, randomItem } from "../random";
import StaticBlob, {
  type StaticBlobClassNames,
} from "../StaticBlob/StaticBlob";
import classes from "./Blob.module.scss";

export type BlobAnimation =
  | "eye-roll"
  | "eye-roll-reverse"
  | "eye-converge"
  | "eye-converge-reverse"
  | "eye-flock";

export type BlobClassNames = StaticBlobClassNames & {
  animated?: string;
  roll?: string;
  rollReverse?: string;
  converge?: string;
  convergeReverse?: string;
  flock?: string;
};

const animations = [
  "eye-roll",
  "eye-roll-reverse",
  "eye-converge",
  "eye-converge-reverse",
] as const;

const randomAnimation = () => randomItem<BlobAnimation>([...animations]);
export type BlobProps = BlobDescriptor & {
  animated?: boolean;
  className?: string;
  classNames?: BlobClassNames;
};

const Blob: React.FC<BlobProps> = ({
  animated,
  body,
  className,
  classNames,
  colors,
  eyes,
  height,
  width,
}) => {
  const [animation, setAnimation] = useState<BlobAnimation | null>(null);

  useEffect(() => {
    if (!animated) return undefined;
    if (!animation) {
      const timeout = setTimeout(
        () => setAnimation(randomAnimation),
        random(0, 20000),
      );
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [animated, animation]);

  return (
    <StaticBlob
      body={body}
      className={clsx(
        classes.root,
        {
          [classes.animated]: animated,
          [classes.roll]: animation === "eye-roll",
          [classes.rollReverse]: animation === "eye-roll-reverse",
          [classes.converge]: animation === "eye-converge",
          [classes.convergeReverse]: animation === "eye-converge-reverse",
          [classes.flock]: animation === "eye-flock",
        },
        {
          [classNames?.animated || ""]: animated,
          [classNames?.roll || ""]: animation === "eye-roll",
          [classNames?.rollReverse || ""]: animation === "eye-roll-reverse",
          [classNames?.converge || ""]: animation === "eye-converge",
          [classNames?.convergeReverse || ""]:
            animation === "eye-converge-reverse",
          [classNames?.flock || ""]: animation === "eye-flock",
        },
        className,
      )}
      classNames={{
        root: classNames?.root,
        eye: clsx(classes.eye, classNames?.eye),
        iris: clsx(classes.iris, classNames?.iris),
        pupil: clsx(classes.pupil, classNames?.pupil),
      }}
      colors={colors}
      eyes={eyes}
      height={height}
      width={width}
      onClick={() => setAnimation("eye-flock")}
      onAnimationEnd={() => setAnimation(null)}
    />
  );
};
export default Blob;
