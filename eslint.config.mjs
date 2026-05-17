import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default [
  {
    ignores: ["node_modules/", ".next/", "out/"],
  },
  ...compat.extends("next/core-web-vitals", "prettier"),
  ...compat.plugins("react", "jest"),
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
    },
  },
];
