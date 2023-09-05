import { render, screen } from '@testing-library/react';

import App from '../App';

it('should show "Vite + React + Trybe" text', () => {
  render(<App />);
  expect(screen.getByText(/vite \+ react \+ trybe/i)).toBeInTheDocument();
});
