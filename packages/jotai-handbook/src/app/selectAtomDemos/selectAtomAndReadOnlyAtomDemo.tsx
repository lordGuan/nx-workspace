import { atom } from 'jotai';
import {
  ChangeBirthButton,
  personAtom,
  ReplayBirthButton,
  useRenderCounter,
} from './selectAtomDemo';
import { useAtomValue } from 'jotai/index';
import { selectAtom } from 'jotai/utils';
import deepEquals from 'fast-deep-equal';

const nameSelectAtom = selectAtom(
  personAtom,
  (person) => person.name,
  deepEquals
);

/**
 * 如果selectAtom没有指明equalsFn，则和read-only atom表现类似
 */
const nameReadonlyAtom = atom((get) => {
  return get(personAtom).name;
});

const DisplayNameBySelectAtom = () => {
  const name = useAtomValue(nameSelectAtom);
  const n = useRenderCounter();
  return (
    <div>
      <div data-testid={'select-atom-display'}>
        {name.first} {name.last}
      </div>
      <div data-testid={'select-atom-render-count'}>{n}</div>
    </div>
  );
};

const DisplayNameByReadonlyAtom = () => {
  const name = useAtomValue(nameReadonlyAtom);
  const n = useRenderCounter();
  return (
    <div>
      <div data-testid={'read-only-atom-display'}>
        {name.first} {name.last}
      </div>
      <div data-testid={'read-only-atom-render-count'}>{n}</div>
    </div>
  );
};

export const SelectAtomAndReadOnlyAtomDemo = () => {
  return (
    <div>
      <DisplayNameBySelectAtom />
      <DisplayNameByReadonlyAtom />
      <ReplayBirthButton />
      <ChangeBirthButton />
    </div>
  );
};
