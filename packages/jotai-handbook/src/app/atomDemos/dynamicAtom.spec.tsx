import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { DynamicAtomDemo } from './dynamicAtom';

describe('DynamicAtom', () => {
  it('renders without crashing', async () => {
    const { getByTestId } = render(<DynamicAtomDemo value={10} />);
    const display = getByTestId('dynamic-atom-display');
    expect(display.textContent).eql('10');

    const button = screen.getByTestId('dynamic-atom-add-button');
    await userEvent.click(button);
    expect(display.textContent).eql('11');
  });
});