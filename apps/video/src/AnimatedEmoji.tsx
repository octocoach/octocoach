import { Lottie } from "@remotion/lottie";
import { z } from "zod";

import goose from "./lottie/goose.json";
import mechanicalArm from "./lottie/mechanical-arm.json";
import moneyFace from "./lottie/money-face.json";
import muscle from "./lottie/muscle.json";
import peacock from "./lottie/peacock.json";
import rocket from "./lottie/rocket.json";

export const emojiEnum = z.enum([
  "peacock",
  "goose",
  "mechanicalArm",
  "rocket",
  "muscle",
  "moneyFace",
]);

const emojiLotties = {
  peacock,
  goose,
  mechanicalArm,
  rocket,
  muscle,
  moneyFace,
} as const;

export const animatedEmojiSchema = z.object({
  emoji: emojiEnum,
  width: z.number(),
  playbackRate: z.number().optional(),
});

export const AnimatedEmoji = ({
  emoji,
  width,
  playbackRate,
}: z.infer<typeof animatedEmojiSchema>) => {
  return (
    <Lottie
      animationData={emojiLotties[emoji]}
      style={{ width }}
      playbackRate={playbackRate}
      loop
    />
  );
};
