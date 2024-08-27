import { atomWithLazy } from 'jotai/utils';
import { atom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

/**
 * 假设这是一个执行会产生很大消耗的函数
 */
const initializeExpensiveResult = () => {
  return Date.now();
};

/**
 * 从语法上也不难看出，是定义即执行
 */
const diligentAtom = atom(initializeExpensiveResult());
/**
 * 提供一个初始化方法，当atom首次被订阅（同一个store）时才会调用初始化方法
 * 主要针对初始化动作比较耗时，只在特定的时候才进行初始化
 * 如果一个atom在多个store或者说作用域下都有使用，每个都是独立初始化
 */
const lazyAtom = atomWithLazy(initializeExpensiveResult);

const Component1 = () => {
  const value = useAtomValue(diligentAtom);

  return <div data-testid={'diligent-display'}>{value}</div>;
};

const Component2 = () => {
  const value = useAtomValue(lazyAtom);

  return <div data-testid={'lazy-display'}>{value}</div>;
};

export const LazyDemo = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 2000);
  }, []);

  return (
    <div>
      {visible && (
        <div data-testid={'result-display'}>
          <Component1 />
          <Component2 />
        </div>
      )}
    </div>
  );
};
