import { atom, useAtom, useAtomValue } from 'jotai';

// 一个基础的atom
// 通常建议是基础类型
// 对象可以理解为一组状态的集合，实际使用时考虑到对象引用问题，需要进行拆分以防止额外的更新
const AgeAtom = atom(10);

// read-only atom
// useAtom 不会返回setter
// 注意：jotai中没有selector的概念，只读atom就充当了selector的角色，用于生成衍生值
const DoubleAgeAtom = atom((get) => get(AgeAtom) * 2);
// write-only atom
// useAtom 只返回setter
// 可以用于对某个atom赋值逻辑的抽象
const IncreaseAgeAtom = atom(null, (get, set, args: number) => {
  set(AgeAtom, get(AgeAtom) + args);
  // set(AgeAtom, v => v + 1);
});

// read-write atom
// 相当于writable selector
const ReadWriteAgeAtom = atom((get) => {
  return get(AgeAtom) + 2;
}, (get, set) => {
  set(AgeAtom, get(AgeAtom) + 2);
});

export const BaseAtomDemo = () => {
  const [age, setAge] = useAtom(AgeAtom);
  const doubleAge = useAtomValue(DoubleAgeAtom);
  const [, increase] = useAtom(IncreaseAgeAtom);
  const [ageAdded2, increase2] = useAtom(ReadWriteAgeAtom);
  return <div>
    <div data-testid={'age-display'}>{age}</div>
    <div data-testid={'double-age-display'}>{doubleAge}</div>
    <div data-testid={'old2-age-display'}>{ageAdded2}</div>
    <div>
      <button data-testid={'age-add-button'} onClick={() => setAge(v => v + 1)} />
      <button data-testid={'age-increase-button'} onClick={() => increase(1)} />
      <button data-testid={'age-increase2-button'} onClick={() => increase2()} />
    </div>
  </div>;
};
