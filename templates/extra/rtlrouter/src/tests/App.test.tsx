import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import App from '../App';

it('should show "Vite + React" text', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  expect(screen.getByText(/vite \+ react/i)).toBeInTheDocument();
});
