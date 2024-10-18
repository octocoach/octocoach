import { Gif } from "@remotion/gif";
import { useMemo } from "react";
import { useVideoConfig } from "remotion";
import { z } from "zod";

import { useIsLandscape, usePanels } from "../hooks";

const gifPropsSchema = z.object({
  id: z.string(),
});

export const gifSchema = z.object({
  type: z.literal("gif"),
  props: gifPropsSchema,
});

export const GifReaction = ({ id }: z.infer<typeof gifPropsSchema>) => {
  if (!id) return null;

  const video = useVideoConfig();
  const panels = usePanels();
  const isLandscape = useIsLandscape();

  const { width, height } = useMemo(() => {
    if (panels.length === 0) throw new Error("No scenes found");

    if (isLandscape)
      return { width: video.width / panels.length, height: video.height };
    else return { width: video.width, height: video.height / panels.length };
  }, [panels.length, video.width, video.height, isLandscape]);

  return (
    <Gif
      src={`https://media.giphy.com/media/${id}/giphy.gif`}
      width={width}
      height={height}
      fit="contain"
    />
  );
};
