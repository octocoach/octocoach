export const superAdminUser = "avanderbergh@gmail.com";

interface Level {
  title: string;
  description: string;
}

export const skillLevels: Level[] = [
  {
    title: "Novice",
    description: "I have no experience or knowledge about this topic.",
  },
  {
    title: "Beginner",
    description:
      "I have a basic understanding and can perform simple tasks with guidance.",
  },
  {
    title: "Competent",
    description:
      "I can perform tasks related to the topic independently. I can handle regular tasks confidently and I'm starting to deal with more complex issues.",
  },
  {
    title: "Advanced",
    description:
      "I can perform complex tasks and solve difficult problems. I have a deep understanding of the topic.",
  },
  {
    title: "Expert",
    description:
      "I have a deep and comprehensive understanding of the topic. I can teach others and handle all issues, including novel ones.",
  },
];
