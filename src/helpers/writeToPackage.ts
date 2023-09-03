import fs from 'fs-extra';
import path from 'path';
import sortPackageJson from 'sort-package-json';
import { dependenciesVersionMap, scriptsMap } from '../utils/dependencies.js';
import type { Dependency, Script } from '../utils/dependencies.js';

export function addProjectName(projectName: string): void {
  const pkgPath = path.join(projectName, 'package.json');
  const pkgJson = fs.readJsonSync(pkgPath);

  pkgJson.name = projectName;
  fs.writeJsonSync(pkgPath, pkgJson, { spaces: 2 });
}

export function addDependency(opts: {
  dependencies: Dependency[]
  projectDir: string
  dev: boolean
}): void {
  const { dependencies, projectDir, dev } = opts;

  const pkgPath = path.join(projectDir, 'package.json');
  const pkgJson = fs.readJsonSync(pkgPath);

  dependencies.forEach((dep) => {
    const version = dependenciesVersionMap[dep];
    if (dev) {
      pkgJson.devDependencies[dep] = version;
    } else {
      pkgJson.dependencies[dep] = version;
    }
  });

  const sortedPkg = sortPackageJson(pkgJson);
  fs.writeJsonSync(pkgPath, sortedPkg, { spaces: 2 });
};

export function addScript(opts: {
  scripts: Script[]
  projectDir: string
}): void {
  const { scripts, projectDir } = opts;

  const pkgPath = path.join(projectDir, 'package.json');
  const pkgJson = fs.readJsonSync(pkgPath);

  scripts.forEach((script) => {
    const cmd = scriptsMap[script];
    pkgJson.scripts[script] = cmd;
  });

  fs.writeJsonSync(pkgPath, pkgJson, { spaces: 2 });
};
