import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Suspense } from 'react';

const userIdAtom = atom(1);
// read-only atom可以返回异步结果，依赖async atom的组件需要包裹Suspense以处理loading状态
// read方法的第二个参数options，提供signal用于打断请求
// 比如userId发生变化，上一个请求可以被signal打断
// 注意：async atom的结果不会根据依赖产生缓存
// 比如userId 1->2->3->1，第四次依然正常请求，不会直接复用第一次的结果
export const userAtom = atom<Promise<{ username: string }>>(
  async (get, { signal }) => {
    const userId = get(userIdAtom);
    const response = await fetch(`https://dummyjson.com/users/${userId}`, {
      signal,
    });
    return response.json();
  }
);

const User = () => {
  const userId = useAtomValue(userIdAtom);
  const [user] = useAtom(userAtom);
  return <div data-testid={'user-display' + userId}>{user.username}</div>;
};

export const AsyncAtomDemo = () => {
  const setUserId = useSetAtom(userIdAtom);
  return (
    <div>
      <div>
        <button
          data-testid={'add-button'}
          onClick={() => {
            setUserId((id) => ++id);
          }}
        />
      </div>
      <Suspense
        fallback={<div data-testid={'loading-display'}>loading...</div>}
      >
        <User />
      </Suspense>
    </div>
  );
};
