import Image from "next/image";

export const FillImage = ({
  src,
  alt,
  minHeight = 0,
  minWidth = 0,
}: {
  src: string;
  alt: string;
  minHeight?: number;
  minWidth?: number;
}) => (
  <div
    style={{
      position: "relative",
      width: "100%",
      height: "100%",
      minHeight,
      minWidth,
    }}
  >
    <Image
      src={src}
      alt={alt}
      fill
      style={{ objectFit: "cover", imageRendering: "pixelated", zIndex: 0 }}
    />
  </div>
);
