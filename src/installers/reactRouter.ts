import { REACT_ROUTER_TEMPLATE_PATH } from '../consts.js';
import { addTemplate } from '../helpers/fsFunctions.js';
import { addDependency } from '../helpers/writeToPackage.js';

export function reactRouterInstaller(projectDir: string) {
  addTemplate(REACT_ROUTER_TEMPLATE_PATH, projectDir);

  addDependency({
    dependencies: ['react-router-dom'],
    projectDir,
    dev: false
  });
}
