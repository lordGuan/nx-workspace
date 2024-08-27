import { loadable } from 'jotai/utils';
import { userAtom } from './asyncAtom';
import { useAtom } from 'jotai';

/**
 * loadable实际上是一个工具，包裹一个async atom
 * async atom 需要suspense或者error boundary 来处理过渡态以及错误边界
 * loadable化处理后，通过state，data和error来形成不同的处理逻辑
 * loadable 主要解决的问题就是对一个异步数据的不同状态可以进行准确的识别，effect依赖更加灵活
 * 更好的控制loading过度以及error的错误提示
 */
export const loadableUserAtom = loadable(userAtom);

export const LoadableDemo = () => {
  const [user] = useAtom(loadableUserAtom);

  if (user.state === 'hasError')
    return <div data-testid={'error-display'}>Error</div>;
  if (user.state === 'loading')
    return <div data-testid={'loading-display'}>Loading</div>;
  return <div data-testid={'user-display'}>{user.data.username}</div>;
};
