import { createContext, useCallback, useMemo, useState } from 'react';
import { Todo } from '../models/Todo';

interface TodosContextInterface {
  todos: Todo[];
  activeFilter: string;
  addTodo: (text: string) => void;
  completeAllTodos: () => void;
  toggleTodoComplete: (id: number) => void;
  clearCompleted: () => void;
  editTodo: (id: number, text: string) => void;
  deleteTodo: (id: number) => void;
  setActiveFilter: (filter: string) => void;
  //   todosCount: number;
  // completedCount: number;
  // completeAllTodos: () => void;
  // completeTodo: (id: number) => void;
  // clearCompleted: () => void;
  // editTodo: (id: number, text: string) => void;
  // deleteTodo: (id: number) => void;
}

export const TodosContext = createContext<TodosContextInterface>({} as any);

export interface TodosProviderProps {
  todos?: Todo[];
}

export const TodosProvider: React.FC<TodosProviderProps> = ({
  children,
  todos: todosFromProps = [],
}) => {
  const [todos, setTodos] = useState<Todo[]>(todosFromProps);
  const [activeFilter, setActiveFilter] = useState('All');

  const completeAllTodos = useCallback(() => {
    const newTodos = todos.map((t) => ({ ...t, completed: true }));
    setTodos(newTodos);
  }, [todos]);

  const clearCompleted = useCallback(() => {
    const newTodos = todos.filter((t) => !t.completed);
    setTodos(newTodos);
  }, [todos]);

  const filteredTodos = useMemo(() => {
    if (activeFilter === 'All') {
      return todos;
    } else if (activeFilter === 'Active') {
      return todos.filter((t) => !t.completed);
    } else {
      return todos.filter((t) => t.completed);
    }
  }, [todos, activeFilter]);

  const toggleTodoComplete = useCallback(() => {}, []);

  const editTodo = useCallback(() => {}, []);

  const deleteTodo = useCallback(() => {}, []);

  const addTodo = useCallback(() => {}, []);

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
