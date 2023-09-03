import { RTL_TEMPLATE_PATH } from '../consts.js';
import { addTemplate } from '../helpers/fsFunctions.js';
import { addDependency, addScript } from '../helpers/writeToPackage.js';

export function rtlInstaller(projectDir: string): void {
  addTemplate(RTL_TEMPLATE_PATH, projectDir);

  addDependency({
    dependencies: [
      'vitest',
      'jsdom',
      '@testing-library/jest-dom',
      '@testing-library/react',
      '@testing-library/user-event'
    ],
    projectDir,
    dev: true
  });

  addScript({
    scripts: [
      'test',
      'coverage'
    ],
    projectDir
  });
}
