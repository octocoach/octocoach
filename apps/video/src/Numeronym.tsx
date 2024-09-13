import { interpolate } from "remotion";

export const Numeronym = ({
  text,
  progress,
}: {
  text: string;
  progress: number;
}) => {
  const p = 1 - progress;
  const firstLetter = text[0];
  const rest = text.slice(1);

  const showLetters = Math.round(p * rest.length);
  const hiddenLetters = rest.length - showLetters;

  const fontWeight = interpolate(progress, [0, 1], [300, 900]);

  return (
    <div style={{ fontSize: 60, fontWeight }}>
      <span>
        {firstLetter}
        {rest.slice(0, showLetters)}
        {hiddenLetters > 0 ? hiddenLetters : ""}
      </span>
    </div>
  );
};
