import { render, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect } from 'vitest';
import { AtomOnMountDemo, AgeAtom } from './onMount';
import { useAtom } from 'jotai';


describe('onMount', () => {
  it('', async () => {
    const { getByTestId } = render(<AtomOnMountDemo />);
    const ageDisplay = getByTestId('age-display');
    expect(ageDisplay.textContent).eql('20');

    const addButton = screen.getByTestId('add-button');
    await userEvent.click(addButton);
    expect(ageDisplay.textContent).eql('21');

    // 手动卸载掉
    const toggleButton = screen.getByTestId('toggle-button');
    await userEvent.click(toggleButton);
    const { result } = renderHook(() => useAtom(AgeAtom));
    expect(result.current[0]).eql(19);
  });
});