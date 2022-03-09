import { TodoTextInput } from './TodoTextInput';

interface HeaderProps {
  onAddTodo: (text: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddTodo }) => (
  <header className="header">
    <h1>todos</h1>
    <TodoTextInput
      isNewTodo
      onSave={(text: string) => {
        if (text.length !== 0) {
          onAddTodo(text);
        }
      }}
      placeholder="What needs to be done?"
    />
  </header>
);
