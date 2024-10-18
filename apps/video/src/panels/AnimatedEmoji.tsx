import { Lottie } from "@remotion/lottie";
import { z } from "zod";

import goose from "../lottie/goose.json";
import graduationCap from "../lottie/graduation-cap.json";
import mechanicalArm from "../lottie/mechanical-arm.json";
import moneyFace from "../lottie/money-face.json";
import muscle from "../lottie/muscle.json";
import nerdFace from "../lottie/nerd-face.json";
import peacock from "../lottie/peacock.json";
import rocket from "../lottie/rocket.json";
import unamused from "../lottie/unamused.json";

export const emojiEnum = z.enum([
  "graduationCap",
  "goose",
  "mechanicalArm",
  "moneyFace",
  "muscle",
  "nerdFace",
  "peacock",
  "rocket",
  "unamused",
]);

const emojiLotties = {
  graduationCap,
  goose,
  mechanicalArm,
  moneyFace,
  muscle,
  nerdFace,
  peacock,
  rocket,
  unamused,
} as const;

export const animatedEmojiPropsSchema = z.object({
  emoji: emojiEnum,
  width: z.number().describe("Width of the emoji in pixels"),
  playbackRate: z.number().describe("Playback rate of the emoji (0 = paused)"),
});

export const animatedEmojiSchema = z
  .object({
    type: z.literal("animatedEmoji"),
    props: animatedEmojiPropsSchema,
  })
  .describe("An animated emoji");

export const AnimatedEmoji = ({
  emoji,
  width,
  playbackRate,
}: z.infer<typeof animatedEmojiPropsSchema>) => {
  return (
    <Lottie
      animationData={emojiLotties[emoji]}
      style={{ width }}
      playbackRate={playbackRate <= 0 ? 1 : playbackRate}
      loop
    />
  );
};
