import { atom, useAtom, useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import deepEquals from 'fast-deep-equal';
import { useEffect, useRef } from 'react';

const defaultPerson = {
  name: {
    first: 'Jane',
    last: 'Doe',
  },
  birth: {
    year: 2000,
    month: 'Jan',
    day: 1,
    time: {
      hour: 0,
      minute: 0,
    },
  },
};

const personAtom = atom(defaultPerson);

/**
 * nameAtom是一个有personAtom驱动的原子
 * 当personAtom变更时，会执行selector(第二个参数)，得到的结果通过equalityFn（第三个参数）进行判断
 * 由判断结果决定nameAtom是否更新
 *
 * 默认的equality判断是引用相同
 *
 * 和read-only atom不同的时，reader订阅的atom变化就会引起read-only atom的变化
 * 用在衍生出的值为引用类型的场景
 */
const nameAtom = selectAtom(personAtom, (person) => person.name);

const birthAtom = selectAtom(personAtom, (person) => person.birth, deepEquals);

/**
 * 统计渲染次数
 */
const useRenderCounter = () => {
  const rerenderCountRef = useRef(0);
  useEffect(() => {
    rerenderCountRef.current += 1;
  });
  return rerenderCountRef.current;
};

/**
 * nameAtom更新时次数更新
 * @constructor
 */
const DisplayName = () => {
  const name = useAtomValue(nameAtom);
  const n = useRenderCounter();
  return (
    <div>
      <div data-testid={'name-display'}>
        {name.first} {name.last}
      </div>
      <div data-testid={'name-render-count'}>{n}</div>
    </div>
  );
};

/**
 * birthAtom更新时次数更新
 * @constructor
 */
const DisplayBirthday = () => {
  const birth = useAtomValue(birthAtom);
  const n = useRenderCounter();

  return (
    <div>
      <div data-testid={'birth-display'}>
        {birth.month}/{birth.day}/{birth.year}
      </div>
      <div data-testid={'birth-render-count'}>{n}</div>
    </div>
  );
};

const SwapNameButton = () => {
  const [, setPerson] = useAtom(personAtom);

  /**
   * 仅切换first和last的值，name引用并没有变
   * nameAtom不会更新
   * birthAtom不会更新
   * 注意：personAtom也不会更新
   */
  const handleSwapName = () => {
    setPerson((p) => {
      let first = p.name.first;
      let last = p.name.last;
      p.name.last = first;
      p.name.first = last;

      return p;
    });
  };
  return <button data-testid={'swap-name-button'} onClick={handleSwapName} />;
};

const UpdateNameButton = () => {
  const [person, setPerson] = useAtom(personAtom);
  /**
   * name引用变更
   * 注意：person.name对象内容已经发生变更，只是没有引起更新，因此这里已经是swap的结果
   * nameAtom更新
   * birthAtom不更新
   */
  const handleUpdateName = () => {
    setPerson({
      ...person,
      name: { first: person.name.first, last: person.name.last },
    });
  };

  return (
    <button data-testid={'update-name-button'} onClick={handleUpdateName} />
  );
};
const ReplayBirthButton = () => {
  const [person, setPerson] = useAtom(personAtom);
  /**
   * name和birth引用均变更
   * nameAtom更新
   * birthAtom由于deepEquals，不会更新
   */
  const handleReplaceBirthdayWithSameValue = () => {
    setPerson({
      name: { first: person.name.first, last: person.name.last },
      birth: {
        year: person.birth.year,
        month: person.birth.month,
        day: person.birth.day,
        time: {
          hour: person.birth.time.hour,
          minute: person.birth.time.minute,
        },
      },
    });
  };
  return (
    <button
      data-testid={'same-birth-button'}
      onClick={handleReplaceBirthdayWithSameValue}
    />
  );
};

const ChangeBirthButton = () => {
  const [person, setPerson] = useAtom(personAtom);
  /**
   * 变更了birth的实际内容
   * name引用没变，nameAtom不更新
   * birth实际值发生变化，因为deepEquals，birthAtom将更新
   */
  const handleChangeBirth = () => {
    setPerson({
      name: person.name,
      birth: { ...person.birth, year: person.birth.year + 1 },
    });
  };

  return (
    <button data-testid={'change-birth-button'} onClick={handleChangeBirth} />
  );
};

export const SelectAtomDemo = () => {
  return (
    <div>
      <DisplayName />
      <DisplayBirthday />
      <SwapNameButton />
      <UpdateNameButton />
      <ReplayBirthButton />
      <ChangeBirthButton />
    </div>
  );
};
