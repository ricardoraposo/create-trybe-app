import { addDependency } from '../helpers/writeToPackage.js';

export function reduxInstaller(projectDir: string) {
  addDependency({
    dependencies: [
      'redux',
      'react-redux',
      '@redux-devtools/extension',
      'redux-thunk'
    ],
    projectDir,
    dev: false
  });
}
