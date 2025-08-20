import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hero title', () => {
  render(<App />);
  const title = screen.getByText(/Travel with confidence/i);
  expect(title).toBeInTheDocument();
});

test('renders tabs', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /Assistance/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Insurance/i })).toBeInTheDocument();
});
