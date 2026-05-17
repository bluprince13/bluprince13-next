import nextConfig from "eslint-config-next";
import eslintConfigPrettier from "eslint-config-prettier";
import jestPlugin from "eslint-plugin-jest";

const eslintConfig = [
  {
    ignores: ["node_modules/", ".next/", "out/", "coverage/"],
  },
  ...nextConfig,
  eslintConfigPrettier,
  {
    ...jestPlugin.configs['flat/recommended'],
    files: ["**/*.test.{js,jsx,ts,tsx}", "**/tst/**/*.{js,jsx,ts,tsx}"],
  },
  {
    files: ["tst-e2e/**/*.{js,jsx,ts,tsx}"],
    rules: {
      "react-hooks/rules-of-hooks": "off",
    },
  },
  {
    settings: {
      "import/resolver": {
        alias: {
          map: [
            ["@App", "./src/app"],
            ["@Public", "./public"],
            ["@Components", "./src/components"],
            ["@Modules", "./src/modules"],
            ["@Styles", "./src/styles"],
            ["@Content", "./src/content"],
            ["@Apps", "./src/apps"],
          ],
        },
      },
    },
    rules: {
      "react/jsx-filename-extension": [
        1,
        { extensions: [".js", ".jsx", ".tsx"] },
      ],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-props-no-spreading": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/static-components": "off",
    },
  },
];

export default eslintConfig;
