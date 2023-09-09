import { runNpmInstall, runInstallDebug } from './fsFunctions.js';
import { logger } from '../utils/logger.js';

export async function dependencyInstaller(projectName: string, installer: string, debug: boolean): Promise<void> {
  if (debug) {
    runInstallDebug(projectName, installer);
  } else {
    await runNpmInstall(projectName, installer);
  }
  logger.success('\nDependências instaladas!');
}
