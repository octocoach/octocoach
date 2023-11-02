"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { makePixelBackground } from "./helpers";

export const PixelBackground = ({
  children,
  pixelSize = 10,
}: PropsWithChildren<{ pixelSize?: number }>) => {
  const ref = useRef(null);

  const [backgroundImage, setBackgroundImage] = useState("none");

  useEffect(() => {
    if (ref.current) {
      setBackgroundImage(makePixelBackground({ el: ref.current, pixelSize }));
    } else {
      setBackgroundImage("none");
    }
  }, [ref.current]);

  return (
    <div
      ref={ref}
      style={{
        backgroundImage,
      }}
    >
      {children}
    </div>
  );
};
