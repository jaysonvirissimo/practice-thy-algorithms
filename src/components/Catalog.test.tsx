import { beforeEach, describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Catalog from './Catalog';
import { PROBLEMS } from '../data/problems';
import { markSolved } from '../data/storage';

beforeEach(() => localStorage.clear());

describe('Catalog', () => {
  it('shows a solved seal only for solved problems and never "Ruby soon"', () => {
    markSolved('two_sum', 'javascript');
    render(<Catalog problems={PROBLEMS} onSelect={vi.fn()} />);

    const twoSum = screen.getByRole('button', { name: /Two Sum/ });
    expect(within(twoSum).getByLabelText('Solved')).toBeInTheDocument();
    expect(within(twoSum).getByText('JS')).toBeInTheDocument();

    // An unsolved problem has no seal.
    const reverse = screen.getByRole('button', { name: /Reverse Linked List/ });
    expect(within(reverse).queryByLabelText('Solved')).not.toBeInTheDocument();

    // The stale M1 badge is gone.
    expect(screen.queryByText(/Ruby soon/i)).not.toBeInTheDocument();
  });
});
