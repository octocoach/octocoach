import Image from "next/image";

export const FillImage = ({
  src,
  alt,
  minHeight,
}: {
  src: string;
  alt: string;
  minHeight: number;
}) => (
  <div
    style={{
      position: "relative",
      width: "100%",
      height: "100%",
      minHeight,
    }}
  >
    <Image
      src={src}
      alt={alt}
      fill
      style={{ objectFit: "cover", imageRendering: "pixelated" }}
    />
  </div>
);
