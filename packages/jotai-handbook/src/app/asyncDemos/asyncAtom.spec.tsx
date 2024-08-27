import { render, screen, waitFor } from '@testing-library/react';
import { AsyncAtomDemo } from './asyncAtom';
import userEvent from '@testing-library/user-event';

describe('asyncAtom', () => {
  it('should works', async () => {
    render(<AsyncAtomDemo />);
    const loadingDisplay = screen.getByTestId('loading-display');
    expect(loadingDisplay.textContent).eql('loading...');
    await waitFor(
      () => {
        expect(screen.getByTestId('user-display1')).toBeTruthy();
      },
      { timeout: 3000 }
    );
    expect(screen.getByTestId('user-display1').textContent).eql('emilys');

    const button = screen.getByTestId('add-button');
    await userEvent.click(button);
    await userEvent.click(button);
    expect(loadingDisplay.textContent).eql('loading...');
    await waitFor(
      () => {
        expect(screen.getByTestId('user-display3')).toBeTruthy();
      },
      { timeout: 3000 }
    );
    expect(screen.getByTestId('user-display3').textContent).eql('sophiab');
  });
});
