import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SelectAtomAndReadOnlyAtomDemo } from './selectAtomAndReadOnlyAtomDemo';
import userEvent from '@testing-library/user-event';

describe('selectAtomAndReadOnlyAtomDemo', () => {
  it('should ', async () => {
    render(<SelectAtomAndReadOnlyAtomDemo />);

    const nameDisplay = screen.getByTestId('select-atom-display');
    const nameRenderCountDisplay = screen.getByTestId(
      'select-atom-render-count'
    );

    const nameDisplay2 = screen.getByTestId('read-only-atom-display');
    const nameRenderCountDisplay2 = screen.getByTestId(
      'read-only-atom-render-count'
    );
    const replayBirthButton = screen.getByTestId('same-birth-button');
    await userEvent.click(replayBirthButton);

    expect(nameDisplay.textContent).eql('Jane Doe');
    expect(nameRenderCountDisplay.textContent).eql('0');

    expect(nameDisplay2.textContent).eql('Jane Doe');
    expect(nameRenderCountDisplay2.textContent).eql('1');
  });
});
