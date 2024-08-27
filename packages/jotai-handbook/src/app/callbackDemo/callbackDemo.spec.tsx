import { describe, expect } from 'vitest';
import { CallbackDemo } from './callbackDemo';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('callbackDemo', () => {
  it('should ', async () => {
    render(<CallbackDemo />);

    let countDisplay = screen.getByTestId('count-display');
    expect(countDisplay.textContent).eql('0');

    let addButton = screen.getByTestId('add-button');
    await userEvent.click(addButton);

    expect(countDisplay.textContent).eql('0');

    await waitFor(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        expect(true).toBeTruthy();
      },
      { timeout: 2000 }
    );
    expect(countDisplay.textContent).eql('1');
  });
});
