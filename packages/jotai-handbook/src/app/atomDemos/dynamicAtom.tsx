import { FC, useMemo, useRef } from 'react';
import { atom, useAtom } from 'jotai';

export const DynamicAtomDemo: FC<{ value: number }> = ({ value }) => {
  // 在组件内创建atom，需要注意引用不变问题，否则会有死循环问题
  // 可以根据实际情况创建初始值
  // const ageAtomInComponent = useMemo(() => atom(value), [value]);
  const ageAtomInComponent = useRef(atom(value));

  // const [age, setAge] = useAtom(ageAtomInComponent);
  const [age, setAge] = useAtom(ageAtomInComponent.current);

  return <div>
    <div data-testid={'dynamic-atom-display'}>{age}</div>
    <div>
      <button data-testid={'dynamic-atom-add-button'} onClick={() => {
        setAge(v => v + 1);
      }} />
    </div>
  </div>;
};