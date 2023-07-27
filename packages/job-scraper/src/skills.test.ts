import { db, end } from "@octocoach/db/src/connection";
import { afterAll, describe, expect, test } from "vitest";
import { matchSkill } from "./skills";

describe("It correctly matches existing skills", () => {
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
        const skill = await matchSkill({
          db,
          description,
        });

        expect(skill?.id).toBe(id);
      });
    });
  });
});

describe("It returns undefined for non-exitsing skills", () => {
  const descriptions = ["Nest.JS", "NestJS (Framework)"];

  descriptions.forEach((description) => {
    test(description, async () => {
      const skill = await matchSkill({
        db,
        description,
      });
      expect(skill).toBeNull();
    });
  });
});

afterAll(async () => {
  await end();
});
