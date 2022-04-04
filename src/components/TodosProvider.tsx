import { createContext, useCallback, useMemo, useState } from 'react';
import { Todo } from '../models/Todo';

interface TodosContextInterface {
  todos: Todo[];
  activeFilter: TodoFilters;
  addTodo: (text: string) => void;
  completeAllTodos: (complete: boolean) => void;
  toggleTodoComplete: (id: number) => void;
  clearCompleted: () => void;
  editTodo: (id: number, text: string) => void;
  deleteTodo: (id: number) => void;
  setActiveFilter: (filter: TodoFilters) => void;
}

export const TodosContext = createContext<TodosContextInterface>({} as any);

export interface TodosProviderProps {
  todos?: Todo[];
}

export type TodoFilters = 'show_all' | 'show_active' | 'show_completed';
// export const TodoFilters = {
//   show_all: 'show_all',
//   show_active: 'show_active',
//   show_complete: 'show_complete',
// };

// export type TodoFilter = keyof typeof TodoFilters
// export type TodoFilter = keyof typeof TodoFilters

// export enum TodoFilters2 {
//   show_all = 'show_all',
//   show_active = 'show_active',
//   show_complete = 'show_complete',
// };

export const TodosProvider: React.FC<TodosProviderProps> = ({
  children,
  todos: todosFromProps = (window as any).initialState || [],
}) => {
  const [todos, setTodos] = useState<Todo[]>(todosFromProps);
  const [activeFilter, setActiveFilter] = useState<TodoFilters>('show_all');
  // const [activeFilter, setActiveFilter] = useState<TodoFilters2>(TodoFilters2.show_all);

  const completeAllTodos = useCallback(
    (completed: boolean) => {
      const newTodos = todos.map((t) => ({ ...t, completed: completed }));
      setTodos(newTodos);
    },
    [todos]
  );

  const clearCompleted = useCallback(() => {
    const newTodos = todos.filter((t) => !t.completed);
    setTodos(newTodos);
  }, [todos]);

  const filteredTodos = useMemo(() => {
    if (activeFilter === 'show_all') {
      return todos;
    } else if (activeFilter === 'show_active') {
      return todos.filter((t) => !t.completed);
    } else {
      return todos.filter((t) => t.completed);
    }
  }, [todos, activeFilter]);

  const toggleTodoComplete = useCallback(
    (id: number) => {
      const idx = todos.findIndex((x) => x.id === id);

      if (idx >= 0) {
        const todo = { ...todos[idx] };
        todo.completed = !todo.completed;
        const newTodos = [
          ...todos.slice(0, idx),
          todo,
          ...todos.slice(idx + 1, todos.length),
        ];
        setTodos(newTodos);
      }
    },
    [todos]
  );

  const editTodo = useCallback(
    (id: number, text: string) => {
      const idx = todos.findIndex((x) => x.id === id);

      if (idx >= 0) {
        const todo = { ...todos[idx] };
        todo.text = text;
        const newTodos = [
          ...todos.slice(0, idx),
          todo,
          ...todos.slice(idx + 1, todos.length),
        ];
        setTodos(newTodos);
      }
    },
    [todos]
  );

  const deleteTodo = useCallback(
    (id: number) => {
      const newTodos = todos.filter((t) => t.id !== id);
      setTodos(newTodos);
    },
    [todos]
  );

  const addTodo = useCallback(
    (text: string) => {
      const newTodos: Todo[] = [
        ...todos,
        {
          id: todos.reduce((id, todo) => Math.max(todo.id, id), -1) + 1,
          text: text.trim(),
          completed: false,
        },
      ];
      setTodos(newTodos);
    },
    [todos]
  );

  return (
    <TodosContext.Provider
      value={{
        activeFilter,
        addTodo,
        completeAllTodos,
        clearCompleted,
        deleteTodo,
        editTodo,
        setActiveFilter,
        todos: filteredTodos,
        toggleTodoComplete,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
