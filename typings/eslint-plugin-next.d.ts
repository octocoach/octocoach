declare module "@next/eslint-plugin-next" {
  import type {
    ClassicConfig,
    Linter,
  } from "@typescript-eslint/utils/ts-eslint";

  declare const exprt: {
    configs: {
      recommended: ClassicConfig.Config;
      "core-web-vitals": ClassicConfig.Config;
    };
    rules: NonNullable<Linter.Plugin["rules"]>;
  };
  export = exprt;
}
