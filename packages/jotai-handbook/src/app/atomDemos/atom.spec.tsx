import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect } from 'vitest';
import { BaseAtomDemo } from './atom';

describe('Atom', () => {
  it('should display age successfully', async () => {
    const { getByTestId } = render(<BaseAtomDemo />);
    const ageDisplay = getByTestId('age-display');
    const doubleAgeDisplay = getByTestId('double-age-display');
    const old2AgeDisplay = getByTestId('old2-age-display');
    expect(ageDisplay.textContent).eql('10');
    expect(doubleAgeDisplay.textContent).eql('20');
    expect(old2AgeDisplay.textContent).eql('12');

    const addButton = screen.getByTestId('age-add-button');
    await userEvent.click(addButton);
    expect(ageDisplay.textContent).eql('11');
    expect(doubleAgeDisplay.textContent).eql('22');
    expect(old2AgeDisplay.textContent).eql('13');


    const increaseButton = screen.getByTestId('age-increase-button');
    await userEvent.click(increaseButton);
    expect(ageDisplay.textContent).eql('12');
    expect(doubleAgeDisplay.textContent).eql('24');
    expect(old2AgeDisplay.textContent).eql('14');

    const increase2Button = screen.getByTestId('age-increase2-button');
    await userEvent.click(increase2Button);
    expect(ageDisplay.textContent).eql('14');
    expect(doubleAgeDisplay.textContent).eql('28');
    expect(old2AgeDisplay.textContent).eql('16');

  });
});