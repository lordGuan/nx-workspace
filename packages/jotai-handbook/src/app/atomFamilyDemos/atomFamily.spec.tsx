import { describe, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { AtomFamilyDemo } from './atomFamily';

describe('AtomFamily', () => {
  it('should ', async () => {
    render(<AtomFamilyDemo />);

    await waitFor(
      () => {
        expect(screen.getByTestId('user-display3')).toBeTruthy();
      },
      { timeout: 3000 }
    );

    expect(screen.getByTestId('user-display3').textContent).eql('sophiab');
    expect(screen.getByTestId('email-display3').textContent).eql(
      'sophia.brown@x.dummyjson.com'
    );
  });
});
