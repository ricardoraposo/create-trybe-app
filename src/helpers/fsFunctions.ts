import path from 'path';
import fs from 'fs';
import { spawnSync } from 'child_process';

export function addTemplate(basePath: string, finalPath: string): void {
  const templateFiles = fs.readdirSync(basePath);
  for (const file of templateFiles) {
    const sourceFilePath = path.join(basePath, file);
    const projectFile = path.join(finalPath, file);

    if (fs.statSync(sourceFilePath).isFile()) {
      fs.copyFileSync(sourceFilePath, projectFile);
    } else {
      if (!fs.existsSync(projectFile)) fs.mkdirSync(projectFile);
      addTemplate(sourceFilePath, projectFile);
    }
  }
}

export function createDir(projectName: string): void {
  fs.mkdirSync(projectName);
}

export function addGit(projectName: string): void {
  spawnSync('git', ['init'], { cwd: projectName });
};

export function runNpmInstall(projectName: string): void {
  spawnSync('npm', ['install'], { cwd: projectName, stdio: 'inherit' });
};
