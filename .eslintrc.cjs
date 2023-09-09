module.exports = {
  overrides: [
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      extends: "standard-with-typescript",
      rules: {
        "@typescript-eslint/strict-boolean-expressions": 0,
        "@typescript-eslint/naming-convention": 0,
        "@typescript-eslint/space-before-function-paren": 0,
        "@typescript-eslint/no-floating-promises": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/semi": ['error', 'always'],
      }
    }
  ],
}
