import { test } from "vitest";
import { users } from "../src/schema/users";

test.only("test", () => {
  console.log("user", users);
});
