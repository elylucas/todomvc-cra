import { Todo } from '../models/Todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggleTodoComplete: (id: number) => void;
  onEditTodo: (id: number, text: string) => void;
  onDeleteTodo: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos: filteredTodos, children, ...actions }) => (
  <ul className="todo-list">
    {filteredTodos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} {...actions} />
    ))}
  </ul>
);
