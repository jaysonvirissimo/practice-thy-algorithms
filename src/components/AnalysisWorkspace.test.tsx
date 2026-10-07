import { beforeEach, describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import AnalysisWorkspace from './AnalysisWorkspace';
import { getAnalysisProblem } from '../data/problems';
import { isAnalysisSolved } from '../data/storage';

beforeEach(() => localStorage.clear());

const ledger = getAnalysisProblem('florentine_deposit_ledger')!;
const LEDGER_ANSWERS = ['1', '80', '81', '1', '80', '1'];

function fillLedger(answers: string[]) {
  const inputs = screen.getAllByRole('textbox');
  answers.forEach((value, i) => fireEvent.change(inputs[i], { target: { value } }));
}

const check = () =>
  fireEvent.click(screen.getByRole('button', { name: /check answers/i }));

describe('AnalysisWorkspace', () => {
  it('marks each part, shows explanations only for correct parts, and allows retry', () => {
    render(<AnalysisWorkspace problem={ledger} onBack={vi.fn()} />);
    expect(screen.queryByText(/Target complexity/)).not.toBeInTheDocument();

    // Part c wrong (forgot the write), the rest right.
    fillLedger(['1', '80', '80', '1', '80', '1']);
    check();
    const parts = screen.getAllByRole('listitem');
    expect(within(parts[2]).getByLabelText('Incorrect')).toBeInTheDocument();
    expect(within(parts[0]).getByLabelText('Correct')).toBeInTheDocument();
    expect(screen.queryByText(ledger.parts[2].explanation!)).not.toBeInTheDocument();
    expect(screen.getByText(ledger.parts[0].explanation!)).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('5/6 correct');
    expect(isAnalysisSolved(ledger.key)).toBe(false);

    // Fix it and re-check.
    fireEvent.change(screen.getAllByRole('textbox')[2], { target: { value: '81' } });
    check();
    expect(screen.getByText(ledger.parts[2].explanation!)).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Solved — 6/6 correct');
    expect(screen.getByTitle('Solved')).toBeInTheDocument();
    expect(isAnalysisSolved(ledger.key)).toBe(true);
  });

  it('restores draft answers on remount', () => {
    const first = render(<AnalysisWorkspace problem={ledger} onBack={vi.fn()} />);
    fillLedger(LEDGER_ANSWERS);
    first.unmount();

    render(<AnalysisWorkspace problem={ledger} onBack={vi.fn()} />);
    const values = screen
      .getAllByRole('textbox')
      .map((el) => (el as HTMLInputElement).value);
    expect(values).toEqual(LEDGER_ANSWERS);
  });

  it('grades a multiple-choice part', () => {
    const tithe = getAnalysisProblem('reeves_tithe_count')!;
    render(<AnalysisWorkspace problem={tithe} onBack={vi.fn()} />);
    fireEvent.click(screen.getByRole('radio', { name: 'N/2' }));
    check();
    expect(screen.getByLabelText('Incorrect')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('radio', { name: 'N' }));
    check();
    expect(screen.getByLabelText('Correct')).toBeInTheDocument();
    expect(isAnalysisSolved(tithe.key)).toBe(true);
  });
});
