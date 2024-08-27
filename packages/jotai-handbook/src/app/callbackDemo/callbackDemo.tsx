import { atom, useAtom, useSetAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useEffect, useState } from 'react';

const countAtom = atom(0);

const Counter = () => {
  const setCount = useSetAtom(countAtom);

  return (
    <div>
      <button data-testid={'add-button'} onClick={() => setCount((c) => ++c)} />
    </div>
  );
};

export const CallbackDemo = () => {
  const [count, setCount] = useState<number>(0);

  /**
   * useAtomCallback需要提供一个经过useCallback包裹的回调
   * 该回调形态与atom的write方法一致
   * 所以useAtomCallback可以理解为在需要时，才会进行对atom的读写
   * 主要用于组件不需要时刻关注atom的变化，仅在特定时刻进行读取的场景
   * 比如：atom为每秒变化一次的高频数据，但实际上只有用户在点击某个按钮时，才需要将atom值带入输入框
   */
  const readCount = useAtomCallback(
    useCallback((get) => {
      const count = get(countAtom);

      setCount(count);

      return count;
    }, [])
  );

  useEffect(() => {
    const timer = setInterval(async () => {
      console.log(readCount());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [readCount]);

  useEffect(() => {
    // 由于CallbackDemo组件并没有订阅count的变化，因此在点击按钮式，并不会引起更新
    // 而是等到定时器调用readCount才回去读取count的变化，进而更新
    console.log('>>>');
  });

  return (
    <div>
      <Counter />
      <div data-testid={'count-display'}>{count}</div>
    </div>
  );
};
