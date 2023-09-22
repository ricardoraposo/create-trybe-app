import { screen } from '@testing-library/react';

import App from '../App';
import renderWithRouterAndRedux from '../utils/renderWithReduxAndRouter';

it('should show "Vite + React + Trybe" text', () => {
  renderWithRouterAndRedux(<App />);
  expect(screen.getByText(/vite \+ react \+ trybe/i)).toBeInTheDocument();
});
