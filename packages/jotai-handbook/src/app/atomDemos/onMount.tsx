import { atom, useAtom } from 'jotai';
import { useState } from 'react';

const DefaultAge = 10;
let initValue = 20;
export const AgeAtom = atom(DefaultAge);
// 注意：onMount仅在首次被订阅时执行
// useSetAtom和useAtomCallback等，由于不是直接订阅atom，因此不会触发onMount
AgeAtom.onMount = (setAtom) => {
  setAtom(initValue);

  // 所有订阅者都卸载后才会执行
  return () => {
    initValue--;
    // 这里虽然可以调用setAtom，但是也会被onMount时给覆盖
  };
};

const ComponentSubAge = () => {
  const [age, setAge] = useAtom(AgeAtom);
  return <div>
    <div data-testid={'age-display'}>{age}</div>
    <button data-testid={'add-button'} onClick={() => setAge(a => a + 1)} />
  </div>;
};
export const AtomOnMountDemo = () => {
  const [count, setCount] = useState<number>(1);
  return <div>
    {count % 2 === 1 ? <ComponentSubAge /> : null}
    <button data-testid={'toggle-button'} onClick={() => setCount(c => c + 1)} />
  </div>;
};