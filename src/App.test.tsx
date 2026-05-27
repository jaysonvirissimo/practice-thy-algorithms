import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the title and the problem catalog', () => {
    render(<App />);
    expect(
      screen.getByRole('button', { name: /back to problem index/i }),
    ).toBeInTheDocument();
    // The catalog lists problems from problems.json.
    expect(
      screen.getByRole('button', { name: /Two Sum/ }),
    ).toBeInTheDocument();
  });
});
