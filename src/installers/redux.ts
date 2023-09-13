import { addDependency } from '../helpers/writeToPackage.js';

export function reduxInstaller(projectDir: string) {
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
