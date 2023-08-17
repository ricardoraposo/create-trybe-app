#!/usr/bin/env node

import fs from "fs/promises";
import { spawnSync } from "child_process";
import input from '@inquirer/input';
import dependencies from "./dependencies.js";


async function getUserInput(): Promise<string> {
  const answer = await input({
    message: 'Enter your name >',
    default: 'trybe-project',
  });

  return answer.toLowerCase().replace(/\s/g, "");
};

async function createViteProject(projectName: string) {
  const args = [
    "create", "vite@latest", projectName,
    "--", "--template", "react-ts"
  ];

  spawnSync("npm", args, { stdio: 'inherit' })
};

async function removeDependencies(pathToPkg: string, dependencyList: RegExp[]) {
  const data = await fs.readFile(pathToPkg, 'utf-8')
  const lines = data.split('\n');

  const filteredLines = lines.filter(line => {
    return !dependencyList.some(regex => regex.test(line));
  });

  const updatedContent = filteredLines.join('\n');
  await fs.writeFile(pathToPkg, updatedContent);
};

async function correctLintCmd(pathToPkg: string) {
  const data = await fs.readFile(pathToPkg, 'utf-8')
  const formatted = data.replace(/^.*"lint".*$/m, '\t\t"lint": "eslint -c .eslintrc.json . --ext .js,.jsx,.ts,.tsx",');
  await fs.writeFile(pathToPkg, formatted);
}

async function addTrybeLinter(pathToPkg: string) {
  const data = await fs.readFile(pathToPkg, 'utf-8')
  const formatted = data.replace(/^.*devDependencies.*$/m, '\t"devDependencies": {\n\t\t"@trybe/eslint-config-frontend": "*",');
  await fs.writeFile(pathToPkg, formatted);
};

async function createEslintConfigFile(projectPath: string) {
  await fs.writeFile(`./${projectPath}/.eslintrc.json`, '{\n\t"extends": "@trybe/eslint-config-frontend/typescript"\n}');
  await fs.unlink(`./${projectPath}/.eslintrc.cjs`);
}

async function main() {
  const projectName = await getUserInput();
  await createViteProject(projectName);

  const packageJsonPath = `./${projectName}/package.json`;
  await removeDependencies(packageJsonPath, dependencies);
  await correctLintCmd(packageJsonPath);
  await addTrybeLinter(packageJsonPath);
  await createEslintConfigFile(projectName);
  console.log("Prontinho");
}

main();
