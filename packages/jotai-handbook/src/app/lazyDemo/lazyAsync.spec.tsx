import { render, screen, waitFor } from '@testing-library/react';
import { LazyAsyncDemo, NormalAsyncDemo } from './lazyAsync';
import { expect } from 'vitest';

describe('Lazy', () => {
  it('should ', async () => {
    render(<LazyAsyncDemo />);

    await waitFor(
      () => {
        expect(screen.getByTestId('result-display')).toBeTruthy();
      },
      { timeout: 3000 }
    );
    expect(screen.getByTestId('loading-display')).toBeTruthy();
    await waitFor(
      () => {
        expect(screen.getByTestId('user-display')).toBeTruthy();
      },
      { timeout: 3000 }
    );
    expect(screen.getByTestId('user-display').textContent).eql('emilys');
  });

  it('should ', async () => {
    render(<NormalAsyncDemo />);

    await waitFor(
      () => {
        expect(screen.getByTestId('result-display')).toBeTruthy();
      },
      { timeout: 3000 }
    );
    expect(screen.getByTestId('loading-display')).toBeTruthy();
    await waitFor(
      () => {
        expect(screen.getByTestId('user-display')).toBeTruthy();
      },
      { timeout: 3000 }
    );
    expect(screen.getByTestId('user-display').textContent).eql('emilys');
  });
});
