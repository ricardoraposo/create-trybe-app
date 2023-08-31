#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';
import input from '@inquirer/input';
import confirm from '@inquirer/confirm';
import dependencies from './dependencies.js';


async function getUserInput(): Promise<string> {
  const answer = await input({
    message: 'Enter your project name >',
    default: 'trybe-project',
  });

  if (answer.trim().length === 0) {
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

async function addPackages(pathToPkg: string, addRouter: boolean) {
  if (addRouter) {
    const data = await fs.readFile(pathToPkg, 'utf-8')
    let formatted = data.replace(/^.*devDependencies.*$/m, '\t"devDependencies": {\n\t\t"@types/react-router-dom": "*",');
    formatted = data.replace(/^.*dependencies.*$/m, '\t"dependencies": {\n\t\t"react-router-dom": "*",');
    await fs.writeFile(pathToPkg, formatted);
  }
  const data = await fs.readFile(pathToPkg, 'utf-8')
  const formatted = data.replace(/^.*devDependencies.*$/m, '\t"devDependencies": {\n\t\t"@trybe/eslint-config-frontend": "*",');
  await fs.writeFile(pathToPkg, formatted);
};

async function createEslintConfigFile(projectPath: string) {
  await fs.writeFile(`./${projectPath}/.eslintrc.json`, '{\n\t"extends": "@trybe/eslint-config-frontend/typescript"\n}');
  await fs.unlink(`./${projectPath}/.eslintrc.cjs`);
}

async function addTemplate(originPath: string[], destinationPath: string[]) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, "..", ...originPath);
  const fileData = await fs.readFile(filePath);

  await fs.writeFile(path.join(...destinationPath, originPath.at(-1) as string), fileData);
}

async function addTemplateFiles(projectName: string, getRouter: boolean) {
  const srcFiles = ["App.tsx", "App.css"];
  srcFiles.forEach((file) => addTemplate(["templates", file], [projectName, "src"]))
  addTemplate(["templates", "trybe.svg"], [projectName, "src", "assets"])

  await fs.mkdir(path.join(projectName, ".vscode"))
  addTemplate(["templates", "settings.json"], [projectName, ".vscode"])

  if (getRouter) {
    addTemplate(["templates", "extra", "react-router", "main.tsx"], [projectName, "src"])
  } else {
    addTemplate(["templates", "main.tsx"], [projectName, "src"])
  }
}

async function main() {
  try {
    const projectName = await getUserInput();
    const getRouter = await confirm({ message: "Deseja instalar o react-router ?" });
    const packageJsonPath = `./${projectName}/package.json`;

    await createViteProject(projectName);
    await removeDependencies(packageJsonPath, dependencies);
    await correctScripts(packageJsonPath);
    await addPackages(packageJsonPath, getRouter);
    await createEslintConfigFile(projectName);
    await addTemplateFiles(projectName, getRouter);
    console.log("Prontinho");
  } catch (err) {
    console.error(err);
  }
}

main();
