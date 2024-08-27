import { atom, PrimitiveAtom, useAtom } from 'jotai';
import { splitAtom } from 'jotai/utils';
import { useEffect } from 'react';

const initialState = [
  {
    task: 'help the town',
    done: false,
  },
  {
    task: 'feed the dragon',
    done: false,
  },
];

const createInitialState = () => [
  {
    task: 'help the town',
    done: false,
  },
  {
    task: 'feed the dragon',
    done: false,
  },
];

const todosAtom = atom(createInitialState());
/**
 * splitAtom常用于一组数据，每个元素都可能被修改，并且数据组也有可能会更新（新增，删除）
 * 如果不使用splitAtom，元素在变更的时候，需要将整个数组都更新，类似setList(oldList => ([...oldList, newItem])
 */
const todoAtomsAtom = splitAtom(todosAtom);

type TodoType = (typeof initialState)[number];

const BadTodosUpdater = () => {
  const [todos, setTodos] = useAtom(todosAtom);
  return (
    <div>
      {todos.map((todo, index) => {
        return (
          <div key={index}>
            <button
              data-testid={'upper-task' + index}
              onClick={() => {
                const newTask = {
                  ...todo,
                  task: todo.task.toUpperCase(),
                };

                setTodos((oldTodos) => {
                  oldTodos[index] = newTask;
                  return oldTodos;
                });
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const TodosUpdater = () => {
  const [todos, setTodos] = useAtom(todosAtom);

  return (
    <div>
      {todos.map((todo, index) => {
        return (
          <div key={index}>
            <button
              data-testid={'upper-task' + index}
              onClick={() => {
                const newTask = {
                  ...todo,
                  task: todo.task.toUpperCase(),
                };

                setTodos((oldTodos) => {
                  oldTodos[index] = newTask;
                  return [...oldTodos];
                });
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const SplitTodoUpdater = ({
  todoAtom,
  index,
}: {
  todoAtom: PrimitiveAtom<TodoType>;
  index: number;
}) => {
  const [todo, setTodo] = useAtom(todoAtom);

  return (
    <div>
      <button
        data-testid={'upper-task' + index}
        onClick={() => {
          setTodo({
            ...todo,
            task: todo.task.toUpperCase(),
          });
        }}
      />
    </div>
  );
};

const SplitTodosUpdater = () => {
  const [todos] = useAtom(todoAtomsAtom);

  return (
    <div>
      {todos.map((todoAtom, index) => {
        return (
          <SplitTodoUpdater key={index} todoAtom={todoAtom} index={index} />
        );
      })}
    </div>
  );
};

const TodosDisplay = () => {
  const [todos, setTodos] = useAtom(todosAtom);
  useEffect(() => {
    setTodos(createInitialState());
  }, [setTodos]);
  return (
    <div>
      {todos.map((todo, index) => {
        return (
          <div key={index} data-testid={'todo-display' + index}>
            {todo.task}
          </div>
        );
      })}
    </div>
  );
};
export const BadTodosDemo = () => {
  return (
    <div>
      <BadTodosUpdater />
      <TodosDisplay />
    </div>
  );
};
export const TodosDemo = () => {
  return (
    <div>
      <TodosUpdater />
      <TodosDisplay />
    </div>
  );
};

export const SplitTodosDemo = () => {
  return (
    <div>
      <SplitTodosUpdater />
      <TodosDisplay />
    </div>
  );
};
