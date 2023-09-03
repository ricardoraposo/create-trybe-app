import fs from 'fs';
import path from 'path';

const depRegex = /^.*dependencies.*$/m;
const devDepRegex = /^.*devDependencies.*$/m;
const scriptRegex = /^.*scripts.*$/m;

export function addPackage(packageName: string, projectName: string): void {
  const packagePath = path.join(projectName, 'package.json');
  const packageFileData = fs.readFileSync(packagePath, 'utf-8');
  const formatted = packageFileData.replace(depRegex, `\t"dependencies": {\n\t\t${packageName},`);
  fs.writeFileSync(packagePath, formatted);
};

export function addDevPackage(packageName: string, projectName: string): void {
  const packagePath = path.join(projectName, 'package.json');
  const packageFileData = fs.readFileSync(packagePath, 'utf-8');
  const formatted = packageFileData.replace(devDepRegex, `\t"devDependencies": {\n\t\t${packageName},`);
  fs.writeFileSync(packagePath, formatted);
};

export function addScript(script: string, projectName: string): void {
  const packagePath = path.join(projectName, 'package.json');
  const packageFileData = fs.readFileSync(packagePath, 'utf-8');
  const formatted = packageFileData.replace(scriptRegex, `\t"scripts": {\n\t\t${script},`);
  fs.writeFileSync(packagePath, formatted);
};
