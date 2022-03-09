import { useState } from 'react';

interface TodoTextInputProps {
  onSave: (text: string) => void;
  text?: string;
  placeholder?: string;
  isEditing?: boolean;
  isNewTodo?: boolean;
}

export const TodoTextInput: React.FC<TodoTextInputProps> = ({
  onSave,
  text = '',
  placeholder = '...',
  isEditing = false,
  isNewTodo = false,
}) => {
  const [value, setValue] = useState(text);
  return (
    <input
      className={`${isEditing ? 'edit' : ''} ${isNewTodo ? 'new-todo' : ''}`}
      type="text"
      placeholder={placeholder}
      autoFocus={true}
      value={value}
      onBlur={(e) => {
        if (!isNewTodo) {
          onSave(e.target.value);
        }
      }}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        console.log({ key: e.key });
        if (e.key === 'Enter') {
          onSave(value);
          if (isNewTodo) {
            setValue('');
          }
        }
      }}
    />
  );
};
