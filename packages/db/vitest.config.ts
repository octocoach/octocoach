import { defineProject, mergeConfig } from "vitest/config";
import sharedConfig from "../../vitest.shared";

export default mergeConfig(
  sharedConfig,
  defineProject({
    test: {
      environment: "node",
      testTimeout: 60000,
    },
  })
);
