import Image from "next/image";

export const FillImage = ({
  src,
  alt,
  minHeight = 0,
  minWidth = 0,
  roundedCorners,
}: {
  src: string;
  alt: string;
  minHeight?: number;
  minWidth?: number;
  roundedCorners?: boolean;
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
      style={{
        objectFit: "cover",
        imageRendering: "pixelated",
        zIndex: 0,
        borderRadius: roundedCorners ? ".25rem" : 0,
      }}
    />
  </div>
);
