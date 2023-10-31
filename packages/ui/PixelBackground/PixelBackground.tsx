"use client";

import { colord } from "colord";
import {
  PropsWithChildren,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  pixel,
  pixelBackground,
  pixelBackgroundWrapper,
} from "./pixelBackground.css";

type PixelBackgroundProps = PropsWithChildren<{
  pixelSize: number;
  backgroundColor: string;
}>;

const mkPalette = (baseColor: string) => ({
  normal: colord(baseColor).toHex(),
  light: colord(baseColor).lighten(0.015).toHex(),
  dark: colord(baseColor).darken(0.015).toHex(),
});

const Pixel = ({ colors }: { colors: ReturnType<typeof mkPalette> }) => {
  const [backgroundColor, setBackgroundColor] = useState(colors.normal);

  useEffect(() => {
    const randomNumber = Math.random();
    setBackgroundColor(colors.normal);
    setTimeout(() => {
      if (randomNumber < 0.1) {
        setBackgroundColor(colors.dark);
      } else if (randomNumber > 0.9) {
        setBackgroundColor(colors.light);
      }
    }, Math.random() * 1000 * 10);
  }, [colors]);

  return <div style={{ backgroundColor }} className={pixel} />;
};

export const PixelBackground = forwardRef<HTMLDivElement, PixelBackgroundProps>(
  ({ children, pixelSize, backgroundColor }, ref) => {
    const innerRef = useRef<HTMLDivElement>(null);

    const [pixels, setPixels] = useState<number[]>([]);

    const [colors, setColors] = useState(mkPalette(backgroundColor));

    useEffect(() => {
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
      setColors(mkPalette(backgroundColor));
    }, [backgroundColor]);

    const onResize = () => {
      const el = innerRef.current;

      const cols = el ? Math.ceil(el.clientWidth / pixelSize) : 0;
      const rows = el ? Math.ceil(el.clientHeight / pixelSize) : 0;
      const newArray = Array.from(Array(rows * cols).keys());
      setPixels(newArray);
    };

    useEffect(() => {
      onResize();
    }, [pixelSize, innerRef.current, innerRef.current?.clientWidth]);

    return (
      <div
        ref={ref}
        className={pixelBackgroundWrapper}
        style={{
          gridTemplateColumns: `repeat(auto-fill, ${pixelSize}px)`,
          height: innerRef.current?.clientHeight,
        }}
      >
        {pixels.map((key) => (
          <Pixel colors={colors} key={key} />
        ))}
        <div className={pixelBackground} ref={innerRef}>
          {children}
        </div>
      </div>
    );
  }
);
