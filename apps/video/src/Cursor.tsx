import * as React from "react";
import {
  Audio,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";

import { c } from "./helpers";

const strokeColor = c("text");

export const Cursor = ({ size }: { size: number }) => {
  const frame = useCurrentFrame();
  const start = 60;
  const end = 120;
  const clickDuration = 30;
  const showClick = frame > end && frame < end + clickDuration;

  const pos = Math.floor(
    interpolate(frame, [start, end], [1000, 50], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-${pos}%, -${pos}%)`,
      }}
    >
      {showClick && (
        <Sequence from={end}>
          <Audio src={staticFile("audio/mouse-click.mp3")} volume={1} />
        </Sequence>
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {showClick && (
          <g id="click">
            <path
              d="M14 4.10001L12 6.00001"
              stroke={strokeColor}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.10001 8L2.20001 7.2"
              stroke={strokeColor}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.99998 12L4.09998 14"
              stroke={strokeColor}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.20001 2.2L8.00001 5.1"
              stroke={strokeColor}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}
        <path
          id="pointer"
          d="M9.03703 9.69C8.99825 9.59865 8.98765 9.4978 9.00659 9.40039C9.02552 9.30297 9.07313 9.21344 9.1433 9.14327C9.21347 9.0731 9.303 9.02549 9.40042 9.00656C9.49783 8.98762 9.59868 8.99822 9.69003 9.037L20.69 13.537C20.7879 13.5772 20.8706 13.6473 20.926 13.7375C20.9815 13.8276 21.007 13.933 20.9987 14.0385C20.9905 14.144 20.949 14.2441 20.8803 14.3245C20.8115 14.405 20.719 14.4615 20.616 14.486L16.267 15.527C16.0875 15.5699 15.9233 15.6616 15.7927 15.7921C15.6621 15.9225 15.5702 16.0865 15.527 16.266L14.487 20.616C14.4628 20.7193 14.4063 20.8122 14.3258 20.8813C14.2453 20.9504 14.1449 20.992 14.0391 21.0003C13.9333 21.0085 13.8276 20.9829 13.7374 20.9271C13.6471 20.8713 13.577 20.7883 13.537 20.69L9.03703 9.69Z"
          stroke={strokeColor}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
