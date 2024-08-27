import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BadTodosDemo, SplitTodosDemo, TodosDemo } from './splitAtom';
import userEvent from '@testing-library/user-event';

describe('SplitAtom', () => {
  it('should not', async () => {
    render(<BadTodosDemo />);
    const changeButton = screen.getByTestId('upper-task0');
    const task0Display = screen.getByTestId('todo-display0');
    expect(task0Display.textContent).eql('help the town');
    await userEvent.click(changeButton);
    expect(task0Display.textContent).eql('help the town');
  });
  it('should ', async () => {
    render(<TodosDemo />);

    const changeButton = screen.getByTestId('upper-task0');
    const task0Display = screen.getByTestId('todo-display0');
    expect(task0Display.textContent).eql('help the town');
    await userEvent.click(changeButton);
    expect(task0Display.textContent).eql('HELP THE TOWN');
  });
  it('should ', async () => {
    render(<SplitTodosDemo />);

    const changeButton = screen.getByTestId('upper-task0');
    const task0Display = screen.getByTestId('todo-display0');
    expect(task0Display.textContent).eql('help the town');
    await userEvent.click(changeButton);
    expect(task0Display.textContent).eql('HELP THE TOWN');
  });
});
