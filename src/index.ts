#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';
import input from '@inquirer/input';
import dependencies from './dependencies.js';


async function getUserInput(): Promise<string> {
  const answer = await input({
    message: 'Enter your project name >',
    default: 'trybe-project',
  });

  if (answer.length === 0 ) {
    return 'trybe-project'
  }
  return answer.toLowerCase().replace(/[,\/\\ ]/g, "");
};

async function createViteProject(projectName: string) {
  const args = [
    "create", "vite@latest", projectName,
    "--", "--template", "react-swc-ts"
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

async function correctScripts(pathToPkg: string) {
  const data = await fs.readFile(pathToPkg, 'utf-8')
  let formatted = data.replace(/^.*"lint".*$/m, '\t\t"lint": "eslint -c .eslintrc.json . --ext .js,.jsx,.ts,.tsx",');
  formatted = formatted.replace(/^.*"dev".*$/m, '\t\t"dev": "vite --open",');
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

async function addTemplate(projectName: string, fileName: string, ...destinationPath: string[]) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, "..", "templates", fileName);
  const fileData = await fs.readFile(filePath);

  await fs.writeFile(path.join(...destinationPath, fileName), fileData);
}

async function addTemplateFiles(projectName: string) {
  const srcFiles = ["App.tsx", "App.css", "main.tsx"];
  srcFiles.forEach((file) => addTemplate(projectName, file, projectName, "src" ))
  addTemplate(projectName, "trybe.webp", projectName, "src", "assets")
}

async function main() {
  try {
    const projectName = await getUserInput();
    const packageJsonPath = `./${projectName}/package.json`;

    await createViteProject(projectName);
    await removeDependencies(packageJsonPath, dependencies);
    await correctScripts(packageJsonPath);
    await addTrybeLinter(packageJsonPath);
    await createEslintConfigFile(projectName);
    await addTemplateFiles(projectName);
    console.log("Prontinho");
  } catch (err) {
    console.error(err);
  }
}

main();
