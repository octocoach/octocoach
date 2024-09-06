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

  return (
    <div style={{ fontSize: 80 }}>
      <span>
        {firstLetter}
        {rest.slice(0, showLetters)}
        {hiddenLetters > 0 ? hiddenLetters : ""}
      </span>
    </div>
  );
};
