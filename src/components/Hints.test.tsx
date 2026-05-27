import { beforeEach, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import Hints from './Hints';
import { loadHintCount, saveHintCount } from '../data/storage';

beforeEach(() => localStorage.clear());

describe('Hints', () => {
  it('renders nothing when there are no hints', () => {
    const { container } = render(<Hints problemKey="two_sum" hints={[]} />);
    expect(container).toBeEmptyDOMElement();
    const none = render(<Hints problemKey="two_sum" />);
    expect(none.container).toBeEmptyDOMElement();
  });

  it('reveals one hint per click and persists the count', () => {
    render(<Hints problemKey="two_sum" hints={['a', 'b']} />);
    // Nothing revealed initially.
    expect(screen.queryByText('a')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /reveal a hint/i }));
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(loadHintCount('two_sum')).toBe(1);

    fireEvent.click(screen.getByRole('button', { name: /reveal a hint/i }));
    expect(screen.getByText('b')).toBeInTheDocument();
    expect(loadHintCount('two_sum')).toBe(2);

    // Exhausted: button gone, message shown.
    expect(
      screen.queryByRole('button', { name: /reveal a hint/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByText(/all hints revealed/i)).toBeInTheDocument();
  });

  it('honors a seeded reveal count and clamps to the hint array length', () => {
    saveHintCount('two_sum', 5); // more than available
    render(<Hints problemKey="two_sum" hints={['a', 'b']} />);
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
    expect(screen.getByText(/all hints revealed/i)).toBeInTheDocument();
  });
});
