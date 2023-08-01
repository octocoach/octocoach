import { progress } from "./progress.css";

export const Progress = ({ max, value }: { max: number; value: number }) => (
  <progress max={max} value={value} className={progress} />
);
