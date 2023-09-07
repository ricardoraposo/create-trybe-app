// import { renderWithRouter } from '../utils/renderWithRouter';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

it('should show "Vite + React" text', () => {
  render(<App />, { wrapper: BrowserRouter });
  // renderWithRouter(<App />);

  expect(screen.getByText(/vite \+ react/i)).toBeInTheDocument();
});
