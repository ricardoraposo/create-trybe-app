import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  entry: ["src/main.ts"],
  format: ["esm"],
  minify: true,
  target: "es2022",
  outDir: "dist",
  onSuccess: "node dist/main.js"
});
