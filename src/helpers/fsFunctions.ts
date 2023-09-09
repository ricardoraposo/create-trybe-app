import path from 'path';
import fs from 'fs';
import { exec, spawnSync } from 'child_process';
import ora from 'ora';

export function addTemplate(basePath: string, finalPath: string) {
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

export function removeFile(projectName: string, filePath = '') {
  const splittedPath = filePath.split('/');
  const fullFilePath = path.join(projectName, ...splittedPath);
  fs.unlinkSync(fullFilePath);
}

export function createDir(projectName: string): void {
  fs.mkdirSync(projectName);
}

export function addGit(projectName: string): void {
  exec('git init', { cwd: projectName });
};

export function runInstallDebug(projectName: string, installer: string) {
  spawnSync(installer, ['install'], { cwd: projectName, stdio: 'inherit' });
};

export async function runNpmInstall(projectName: string, installer = 'npm') {
  const process = exec(`${installer} install`, { cwd: projectName });
  const spinner = ora('Instalando dependências, isso pode levar um tempinho...\n').start();

  await new Promise<void>((resolve, reject) => {
    const t1 = setTimeout(() => spinner.start('Demora um pouco mesmo 😆'), 10000);
    const t2 = setTimeout(() => spinner.start('Ta demorando né...'), 20000);
    const t3 = setTimeout(() => spinner.start('Quase lá, eu prometo!'), 35000);
    const t4 = setTimeout(() => spinner.start('Em 3, 2, 1 e.......'), 50000);
    const t5 = setTimeout(() => spinner.start('Poooode ser que algo esteja errado...'), 65000);

    process.on('error', (e) => { reject(e); });

    process.on('close', () => {
      const timers = [t1, t2, t3, t4, t5];
      timers.forEach((t) => { clearTimeout(t); });
      spinner.stop();
      resolve();
    });
  });
};
