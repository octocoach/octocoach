import { end } from "@octocoach/db/connection";
import { afterAll, describe, expect, test } from "vitest";

describe.skip("It correctly matches existing skills", () => {
  const expected: Record<string, string[]> = {
    KSDJCA4E89LB98JAZ7LZ: ["React (Library)", "React.js"],
    KS1200771D9CR9LB4MWW: ["JavaScript", "JS"],
    KS1200C5XQWW78VQ5ZYL: ["php", "PHP (Programming Language)"],
    KS441LF7187KS0CV4B6Y: ["TypeScript", "TypeScript (Programming Language)"],
    ES7CA4F00390885DBAAB: ["NextJS", "Next.js", "NextJS (Framework)"],
  };
  Object.entries(expected).forEach(([id, terms]) => {
    terms.forEach((description) => {
      test(description, async () => {
        // We need to generate mock data for testing
        expect(1, "Not Implemented").toBe(0);
      });
    });
  });
});

describe.skip("It returns undefined for non-exitsing skills", () => {
  const descriptions = ["Nest.JS", "NestJS (Framework)"];

  descriptions.forEach((description) => {
    test(description, async () => {
      expect(1, "Not Implemented").toBe(0);
    });
  });
});

afterAll(async () => {
  await end();
});
