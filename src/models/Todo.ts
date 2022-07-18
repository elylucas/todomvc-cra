export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoInfo {
  filter: TodoFilters;
  total: number;
  active: number;
  complete: number;
  filteredTodos: Todo[];
}

export type TodoFilters = 'show_all' | 'show_active' | 'show_completed';

export function getTodoInfo(todos: Todo[], filter: TodoFilters): TodoInfo {
  let filteredTodos: Todo[] = [];

  if (filter === 'show_all') {
    filteredTodos = todos;
  } else if (filter === 'show_active') {
    filteredTodos = todos.filter((t) => !t.completed);
  } else if (filter === 'show_completed') {
    filteredTodos = todos.filter((t) => t.completed);
  }

  let total = todos.length;
  let active = todos.filter((x) => !x.completed).length;
  let complete = todos.filter((x) => x.completed).length;

  return {
    filter,
    total,
    active,
    complete,
    filteredTodos,
  };
}