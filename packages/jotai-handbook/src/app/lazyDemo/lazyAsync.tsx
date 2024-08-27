import { atomWithLazy, loadable } from 'jotai/utils';
import { atom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

async function getUser(): Promise<{ username: string }> {
  console.log('>>>request time:', Date.now());
  const response = await fetch(`https://dummyjson.com/users/1`);
  return response.json();
}

/**
 * 注意：这里专门对比了read-only atom
 * lazyAtom仅限于primitive atom，也就是普通atom
 * read-only atom 本身就具有lazy特性，当有订阅时才会调用read方法进行求值
 */
const normalAsyncAtom = loadable(atom(getUser));
const lazyAsyncAtom = loadable(atomWithLazy(getUser));
const UserComponent = () => {
  const user = useAtomValue(normalAsyncAtom);

  if (user.state === 'hasError')
    return <div data-testid={'error-display'}>Error</div>;
  if (user.state === 'loading')
    return <div data-testid={'loading-display'}>Loading</div>;
  return <div data-testid={'user-display'}>{user.data.username}</div>;
};
const LazyUserComponent = () => {
  const user = useAtomValue(lazyAsyncAtom);

  if (user.state === 'hasError')
    return <div data-testid={'error-display'}>Error</div>;
  if (user.state === 'loading')
    return <div data-testid={'loading-display'}>Loading</div>;
  return <div data-testid={'user-display'}>{user.data.username}</div>;
};

export const LazyAsyncDemo = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    console.log('>>>demo mounted:', Date.now());
    setTimeout(() => {
      setVisible(true);
    }, 2000);
  }, []);

  return (
    <div>
      {visible && (
        <div data-testid={'result-display'}>
          <LazyUserComponent />
        </div>
      )}
    </div>
  );
};

export const NormalAsyncDemo = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    console.log('>>>demo mounted:', Date.now());
    setTimeout(() => {
      setVisible(true);
    }, 2000);
  }, []);

  return (
    <div>
      {visible && (
        <div data-testid={'result-display'}>
          <UserComponent />
        </div>
      )}
    </div>
  );
};
