import { unwrap } from 'jotai/utils';
import { userAtom } from './asyncAtom';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

/**
 * 注意：在一个atom中，通过get读取一个async atom会得到一个promise
 * 那么这个atom并不会随着promise resolve而更新
 */
const cannotReadAyncAtom = atom((get) => {
  const userPromise = get(userAtom);
  // const name = await get(userAtom)
  // 如果需要依赖一个async atom解析值进行衍生
  // 则会产生另外一个async atom
  userPromise.then((res) => {
    console.log('>>>resolve:', res.username);
  });

  return '';
});

/**
 * 通过unwrap将一个async atom拆包
 * 在其他atom中使用get将直接读取到相关值
 * 注意:如果unwrap没有通过第二个参数指明fallback值，那么async atom在pending状态将返回undefined
 */
const unwrapLoadableUserAtom = unwrap(userAtom);
const desensitizedUserAtom = atom((get) => {
  const name = get(unwrapLoadableUserAtom)?.username;

  return name ? name.replace(/[aeiou]/g, '*') : '';
});

export const UnwrapDemo = () => {
  const [name] = useAtom(desensitizedUserAtom);

  return (
    <div>
      {name ? (
        <div data-testid={'name-display'}>{name}</div>
      ) : (
        <div data-testid={'empty-display'}>empty</div>
      )}
    </div>
  );
};

export const ReadAsyncDemo = () => {
  const [name] = useAtom(cannotReadAyncAtom);

  return (
    <div>
      <div data-testid={'name-display'}>{name}</div>
    </div>
  );
};
