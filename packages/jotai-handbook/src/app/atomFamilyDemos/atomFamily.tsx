import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import type { Atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { FC, useEffect } from 'react';

type User = {
  id: number;
  username: string;
  age: number;
  email: string;
};

type NullableUser = User | undefined;

const userListAtom = atom<User[]>([]);
/**
 * family内部是一个Map，key就是param，value是atom(param)
 * 所以map的清空操作需要手动处理
 * 如果param是一个对象，就更需要注意
 * 可能造成严重的内存泄露
 *
 * atomFamily支持第二个参数，指明equal关系，当参数为对象时用于更新map的key
 * 如果参数为对象，且equal控制不当，可能导致map中出现冗余数据
 */
const userAtom = atomFamily<number, Atom<NullableUser>>((id) =>
  atom<NullableUser>((get) => {
    const users = get(userListAtom);
    return users.find((u) => u.id === id);
  })
);

const userEmailAtom = atomFamily<number, Atom<string>>((id) =>
  atom((get) => {
    const user = get(userListAtom).find((u) => u.id === id);

    return user?.email || '';
  })
);

const UserDisplay: FC<{ id: number }> = ({ id }) => {
  const user = useAtomValue(userAtom(id));
  const email = useAtomValue(userEmailAtom(id));
  return (
    <div>
      <div data-testid={'user-display' + id}>{user?.username}</div>
      <div data-testid={'email-display' + id}>{email}</div>
    </div>
  );
};

export const AtomFamilyDemo = () => {
  const [userList, setUserList] = useAtom(userListAtom);
  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then((res) => res.json())
      .then((res) => {
        setUserList(res.users);
      });
  }, []);

  return (
    <div>
      {userList.map((user) => {
        return <UserDisplay key={user.id} id={user.id} />;
      })}
    </div>
  );
};
