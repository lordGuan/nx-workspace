import { render, screen, waitFor } from '@testing-library/react';
import { LazyDemo } from './lazy';

describe('Lazy', () => {
  it('should ', async () => {
    render(<LazyDemo />);

    await waitFor(
      () => {
        expect(screen.getByTestId('result-display')).toBeTruthy();
      },
      { timeout: 3000 }
    );

    const time1 = Number(screen.getByTestId('diligent-display').textContent);
    const time2 = Number(screen.getByTestId('lazy-display').textContent);

    expect(time2 - time1).greaterThanOrEqual(2000);
  });
});
