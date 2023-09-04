import fs from 'fs';
import path from 'path';
import sortPackageJson from 'sort-package-json';
import { dependenciesVersionMap, scriptsMap } from '../utils/dependencies.js';
import type { Dependency, Script } from '../utils/dependencies.js';

export function addProjectName(projectName: string): void {
  const pkgPath = path.join(projectName, 'package.json');
  const pkgJson = JSON.parse(fs.readFileSync(pkgPath, { encoding: 'utf-8' }));

  pkgJson.name = projectName;
  fs.writeFileSync(pkgPath, JSON.stringify(pkgJson));
}

export function addDependency(opts: {
  dependencies: Dependency[]
  projectDir: string
  dev: boolean
}): void {
  const { dependencies, projectDir, dev } = opts;

  const pkgPath = path.join(projectDir, 'package.json');
  const pkgJson = JSON.parse(fs.readFileSync(pkgPath, { encoding: 'utf-8' }));

  dependencies.forEach((dep) => {
    const version = dependenciesVersionMap[dep];
    if (dev) {
      pkgJson.devDependencies[dep] = version;
    } else {
      pkgJson.dependencies[dep] = version;
    }
  });

  const sortedPkg = sortPackageJson(JSON.stringify(pkgJson, null, 2));
  fs.writeFileSync(pkgPath, sortedPkg);
};

export function addScript(opts: {
  scripts: Script[]
  projectDir: string
}): void {
  const { scripts, projectDir } = opts;

  const pkgPath = path.join(projectDir, 'package.json');
  const pkgJson = JSON.parse(fs.readFileSync(pkgPath, { encoding: 'utf-8' }));

  scripts.forEach((script) => {
    const cmd = scriptsMap[script];
    pkgJson.scripts[script] = cmd;
  });

  fs.writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2));
};
