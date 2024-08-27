import { render, screen, waitFor } from '@testing-library/react';
import { LoadableDemo } from './loadable';

describe('loadable', () => {
  it('should ', async () => {
    render(<LoadableDemo />);

    const loadingDisplay = screen.getByTestId('loading-display');
    expect(loadingDisplay.textContent).eql('Loading');
    await waitFor(
      () => {
        expect(screen.getByTestId('user-display')).toBeTruthy();
      },
      { timeout: 3000 }
    );
    expect(screen.getByTestId('user-display').textContent).eql('emilys');
  });
});
