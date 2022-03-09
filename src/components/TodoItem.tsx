import { useState } from 'react';
import { Todo } from '../models/Todo';
import { TodoTextInput } from './TodoTextInput';

interface TodoItemProps {
  todo: Todo;
  onToggleTodoComplete: (id: number) => void;
  onEditTodo: (id: number, text: string) => void;
  onDeleteTodo: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleTodoComplete,
  onEditTodo,
  onDeleteTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (id: number, text: string) => {
    if (text.length === 0) {
      onDeleteTodo(id);
    } else {
      onEditTodo(id, text);
    }
    setIsEditing(false);
  };

  let element;
  if (isEditing) {
    element = (
      <TodoTextInput
        text={todo.text}
        isEditing={isEditing}
        onSave={(text) => handleSave(todo.id, text)}
      />
    );
  } else {
    element = (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleTodoComplete(todo.id)}
        />
        <label onDoubleClick={() => setIsEditing(true)}>{todo.text}</label>
        <button className="destroy" onClick={() => onDeleteTodo(todo.id)} />
      </div>
    );
  }

  return (
    <li
      className={`todo ${todo.completed ? 'completed' : ''} ${
        isEditing ? 'editing' : ''
      }`}
    >
      {element}
    </li>
  );
};
