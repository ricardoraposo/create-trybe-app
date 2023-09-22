import { screen } from '@testing-library/react';

import App from '../App';
import renderWithRedux from '../utils/renderWithRedux';

it('should show "Vite + React + Trybe" text', () => {
  renderWithRedux(<App />);
  expect(screen.getByText(/vite \+ react \+ trybe/i)).toBeInTheDocument();
});
