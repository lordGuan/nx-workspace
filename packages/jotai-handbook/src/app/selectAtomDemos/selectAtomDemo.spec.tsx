import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SelectAtomDemo } from './selectAtomDemo';
import userEvent from '@testing-library/user-event';

describe('SelectAtomDemo', () => {
  it('should ', async () => {
    render(<SelectAtomDemo />);

    const nameDisplay = screen.getByTestId('name-display');
    const nameRenderCountDisplay = screen.getByTestId('name-render-count');

    const birthDisplay = screen.getByTestId('birth-display');
    const birthRenderCountDisplay = screen.getByTestId('birth-render-count');

    // 点击切换姓名，nameAtom不更新，组件不渲染
    const swapNameButton = screen.getByTestId('swap-name-button');
    await userEvent.click(swapNameButton);

    expect(nameDisplay.textContent).eql('Jane Doe');
    expect(nameRenderCountDisplay.textContent).eql('0');
    expect(birthDisplay.textContent).eql('Jan/1/2000');
    expect(birthRenderCountDisplay.textContent).eql('0');

    // 点击更新姓名，nameAtom更新，组件渲染
    const updateNameButton = screen.getByTestId('update-name-button');
    await userEvent.click(updateNameButton);

    expect(nameDisplay.textContent).eql('Doe Jane');
    expect(nameRenderCountDisplay.textContent).eql('1');
    expect(birthDisplay.textContent).eql('Jan/1/2000');
    expect(birthRenderCountDisplay.textContent).eql('0');

    // 点击replace按钮，birth的每个字段都重新赋值，由于deepEquals，birthAtom不更新
    // name字段引用变更，nameAtom更新
    const replayBirthButton = screen.getByTestId('same-birth-button');
    await userEvent.click(replayBirthButton);

    expect(nameDisplay.textContent).eql('Doe Jane');
    expect(nameRenderCountDisplay.textContent).eql('2');
    expect(birthDisplay.textContent).eql('Jan/1/2000');
    expect(birthRenderCountDisplay.textContent).eql('0');

    // 点击changeBirth按钮，birth的year字段变更，birthAtom更新
    // name字段引用未变更，nameAtom不更新
    const changeBirthButton = screen.getByTestId('change-birth-button');
    await userEvent.click(changeBirthButton);

    expect(nameDisplay.textContent).eql('Doe Jane');
    expect(nameRenderCountDisplay.textContent).eql('2');
    expect(birthDisplay.textContent).eql('Jan/1/2001');
    expect(birthRenderCountDisplay.textContent).eql('1');
  });
});
