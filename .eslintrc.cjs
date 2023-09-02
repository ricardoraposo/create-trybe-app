module.exports = {
  overrides: [
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      extends: "standard-with-typescript",
      rules: {
        "@typescript-eslint/strict-boolean-expressions": 0,
        "@typescript-eslint/naming-convention": 0,
        "@typescript-eslint/semi": ['error', 'always'],
      }
    }
  ],
}
