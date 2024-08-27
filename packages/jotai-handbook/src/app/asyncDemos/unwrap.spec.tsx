import { render, screen, waitFor } from '@testing-library/react';
import { ReadAsyncDemo, UnwrapDemo } from './unwrap';

describe('Unwrap', () => {
  it('should ', async () => {
    render(<UnwrapDemo />);

    const emptyDisplay = screen.getByTestId('empty-display');
    expect(emptyDisplay.textContent).eql('empty');
    await waitFor(
      () => {
        expect(screen.getByTestId('name-display')).toBeTruthy();
      },
      { timeout: 5000 }
    );
    expect(screen.getByTestId('name-display').textContent).eql(
      'emilys'.replace(/[aeiou]/g, '*')
    );
  });

  it('should not ', async () => {
    render(<ReadAsyncDemo />);
    const emptyDisplay = screen.getByTestId('name-display');
    expect(emptyDisplay.textContent).is.empty;
  });
});
