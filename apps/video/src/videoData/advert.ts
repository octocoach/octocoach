import { z } from "zod";

import { advertSchema } from "../Advert";

export const data: z.infer<typeof advertSchema>[] = [
  {
    locale: "en",
    content: {
      1: {
        layout: "portrait",
        durationInFrames: 4 * 30,
        content: {
          animatedEmoji: {
            emoji: "muscle",
            width: 300,
            playbackRate: 1,
          },
          title: "You already know",
          items: [
            { text: "HTML", logo: "html" },
            { text: "CSS", logo: "css" },
            { text: "JavaScript", logo: "javascript" },
            { text: "React", logo: "react" },
          ],
        },
      },
      2: {
        text: "Don't just use AI",
        durationInFrames: 3 * 30,
        animatedEmoji: {
          emoji: "goose",
          width: 300,
          playbackRate: 1,
        },
        wordsPerLine: 1,
        width: 1080 * 0.3,
      },
      3: {
        text: "Build with it!",
        durationInFrames: 2 * 30,
        animatedEmoji: {
          emoji: "peacock",
          width: 300,
          playbackRate: 1,
        },
        wordsPerLine: 1,
        width: 1080 * 0.3,
      },
      4: {
        durationInFrames: 3 * 30,
        layout: "portrait",
        content: {
          animatedEmoji: {
            emoji: "mechanicalArm",
            width: 300,
            playbackRate: 1,
          },
          title: "Become a NextGen Full-Stack Developer",
          items: [
            { text: "TypeScript", logo: "typescript" },
            { text: "Next.js", logo: "nextjs" },
            { text: "Astro", logo: "astro" },
            { text: "OpenAI", logo: "openai" },
            { text: "Anthropic", logo: "anthropic" },
          ],
        },
      },
      5: {
        imagePan: {
          image: "4.jpg",
          layout: "portrait",
          imagePercentage: 30,
          panDuration: 120,
        },
        lineByLineReveal: {
          text: "Join our 4 month AI Web-App Development Course",
          wordsPerLine: 2,
          durationInFrames: 120,
          width: 1080 * 0.6,
        },
      },
    },
  },
  {
    locale: "de",
    content: {
      1: {
        layout: "portrait",
        durationInFrames: 4 * 30,
        content: {
          animatedEmoji: {
            emoji: "muscle",
            width: 300,
            playbackRate: 1,
          },
          title: "Du kennst schon",
          items: [
            { text: "HTML", logo: "html" },
            { text: "CSS", logo: "css" },
            { text: "JavaScript", logo: "javascript" },
            { text: "React", logo: "react" },
          ],
        },
      },
      2: {
        text: "Benutze nicht nur KI",
        durationInFrames: 3 * 30,
        animatedEmoji: {
          emoji: "goose",
          width: 300,
          playbackRate: 1,
        },
        wordsPerLine: 1,
        width: 1080 * 0.3,
      },
      3: {
        text: "Baue auch damit!",
        durationInFrames: 2 * 30,
        animatedEmoji: {
          emoji: "peacock",
          width: 300,
          playbackRate: 1,
        },
        wordsPerLine: 1,
        width: 1080 * 0.3,
      },
      4: {
        durationInFrames: 3 * 30,
        layout: "portrait",
        content: {
          animatedEmoji: {
            emoji: "mechanicalArm",
            width: 300,
            playbackRate: 1,
          },
          title: "Werde NextGen Full-Stack-Entwickler",
          items: [
            { text: "TypeScript", logo: "typescript" },
            { text: "Next.js", logo: "nextjs" },
            { text: "Astro", logo: "astro" },
            { text: "OpenAI", logo: "openai" },
            { text: "Anthropic", logo: "anthropic" },
          ],
        },
      },
      5: {
        imagePan: {
          image: "4.jpg",
          layout: "portrait",
          imagePercentage: 30,
          panDuration: 120,
        },
        lineByLineReveal: {
          text: "Mach mit bei unserem 4-monatigen KI-Web-App Entwicklungskurs",
          wordsPerLine: 2,
          durationInFrames: 120,
          width: 1080 * 0.6,
        },
      },
    },
  },
];
