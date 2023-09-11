export const dependenciesVersionMap = {
  // React Router
  'react-router-dom': '^6.15.0',

  // React Testing Library
  vitest: '^0.34.3',
  jsdom: '^22.1.0',
  '@testing-library/jest-dom': '^6.1.2',
  '@testing-library/react': '^14.0.0',
  '@testing-library/user-event': '^14.4.3',
  '@types/jest': '^29.5.4',
  '@vitest/coverage-v8': '^0.34.3',

  // Styled Components
  'styled-components': '^6.0.7',

  // Redux
  redux: '^4.2.1',
  'react-redux': '^8.1.2',
  '@redux-devtools/extension': '^3.2.5',
  'redux-thunk': '^2.4.2'
};

export const scriptsMap = {
  // React Testing Library
  test: 'vitest',
  coverage: 'vitest run --coverage'
};

export type Dependency = keyof typeof dependenciesVersionMap;
export type Script = keyof typeof scriptsMap;
