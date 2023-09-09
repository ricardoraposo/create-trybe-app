import { STYLEDBASE_TEMPLATE_PATH, STYLEDROUTER_TEMPLATE_PATH } from '../consts.js';
import { addTemplate, removeFile } from '../helpers/fsFunctions.js';
import { addDependency } from '../helpers/writeToPackage.js';

export function styledComponentsInstaller(projectDir: string, router: boolean) {
  if (router) {
    addTemplate(STYLEDROUTER_TEMPLATE_PATH, projectDir);
    removeFile(projectDir, 'src/App.css');
    removeFile(projectDir, 'src/pages/Counter.css');
  } else {
    addTemplate(STYLEDBASE_TEMPLATE_PATH, projectDir);
    removeFile(projectDir, 'src/App.css');
  }

  addDependency({
    dependencies: ['styled-components'],
    projectDir,
    dev: false
  });
}
