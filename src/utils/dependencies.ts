export const dependenciesVersionMap = {
  // React Router
  'react-router-dom': '^6.15.0',

  // React Testing Library
  vitest: '^0.34.3',
  jsdom: '^22.1.0',
  '@testing-library/jest-dom': '^6.1.2',
  '@testing-library/react': '^14.0.0',
  '@testing-library/user-event': '^14.4.3'
};

export const scriptsMap = {
  // React Testing Library
  test: 'vitest',
  coverage: 'vitest run --coverage'
};

export type Dependency = keyof typeof dependenciesVersionMap;
export type Script = keyof typeof scriptsMap;
