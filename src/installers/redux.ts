import {
  REDUXBASE_TEMPLATE_PATH,
  REDUXROUTER_TEMPLATE_PATH,
  REDUXRTL_TEMPLATE_PATH,
  REDUXRTLROUTER_TEMPLATE_PATH
} from '../consts.js';
import { addTemplate, removeFile } from '../helpers/fsFunctions.js';
import { addDependency } from '../helpers/writeToPackage.js';

export function reduxInstaller(projectDir: string, router: boolean, rtl: boolean, styled: boolean) {
  addTemplate(REDUXBASE_TEMPLATE_PATH, projectDir);

  if (router) addTemplate(REDUXROUTER_TEMPLATE_PATH, projectDir);
  if (rtl) addTemplate(REDUXRTL_TEMPLATE_PATH, projectDir);

  if (rtl && router) addTemplate(REDUXRTLROUTER_TEMPLATE_PATH, projectDir);

  if (styled) removeFile(projectDir, 'src/styles.tsx');

  addDependency({
    dependencies: [
      'redux',
      'react-redux',
      'redux-thunk',
      '@redux-devtools/extension'
    ],
    projectDir,
    dev: false
  });
}
