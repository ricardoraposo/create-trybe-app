import { runNpmInstall, runInstallDebug } from './fsFunctions.js';
import { validPkgManagers } from '../consts.js';
import { logger } from '../utils/logger.js';

export async function dependencyInstaller(projectName: string, installer: string, debug: boolean) {
  let cmd = installer;
  if (!validPkgManagers.includes(installer)) {
    logger.warning(`${installer} não é um gerenciador válido, utilizando npm no lugar.`);
    cmd = 'npm';
  }

  if (debug) {
    runInstallDebug(projectName, cmd);
  } else {
    await runNpmInstall(projectName, cmd);
  }
  logger.success('\nDependências instaladas!');
}
