import { addDevPackage, addScript } from '../helpers/writeToPackage.js';

// npm i -D
const rtlDependencies = [
  '"vitest": "^0.34.3"',
  '"jsdom": "^22.1.0"',
  '"@testing-library/jest-dom": "^6.1.2"',
  '"@testing-library/react": "^14.0.0"',
  '"@testing-library/user-event": "^14.4.3"'
];

const rtlScripts = [
  '"test": "vitest"',
  '"coverage": "vitest run --coverage"'
];

export function addRTLDependencies(projectName: string): void {
  for (const dep of rtlDependencies) {
    addDevPackage(dep, projectName);
  }

  for (const script of rtlScripts) {
    addScript(script, projectName);
  }
}
