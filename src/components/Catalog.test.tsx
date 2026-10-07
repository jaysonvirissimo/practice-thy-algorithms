import { beforeEach, describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import Catalog from './Catalog';
import { ANALYSIS_PROBLEMS, PROBLEMS } from '../data/problems';
import { markAnalysisSolved, markSolved } from '../data/storage';

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

  it('lists analysis problems under Foundations with their own solved seal', () => {
    markAnalysisSolved('masons_guild_roll');
    render(
      <Catalog
        problems={PROBLEMS}
        analysis={ANALYSIS_PROBLEMS}
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByText('Foundations', { selector: '.rubric' })).toBeInTheDocument();
    const roll = screen.getByRole('button', { name: /Masons' Guild Roll/ });
    expect(within(roll).getByLabelText('Solved')).toBeInTheDocument();
    const ledger = screen.getByRole('button', { name: /Florentine Deposit Ledger/ });
    expect(within(ledger).queryByLabelText('Solved')).not.toBeInTheDocument();
  });

  it('filters analysis problems by title and hides an empty section', () => {
    render(
      <Catalog
        problems={PROBLEMS}
        analysis={ANALYSIS_PROBLEMS}
        onSelect={vi.fn()}
      />,
    );
    const search = screen.getByRole('searchbox', { name: /search problems/i });

    fireEvent.change(search, { target: { value: 'tithe' } });
    expect(screen.getByRole('button', { name: /Reeve's Tithe Count/ })).toBeInTheDocument();
    expect(screen.queryByText('Index of Problems')).not.toBeInTheDocument();

    fireEvent.change(search, { target: { value: 'two sum' } });
    expect(screen.queryByText('Foundations', { selector: '.rubric' })).not.toBeInTheDocument();
  });
});
