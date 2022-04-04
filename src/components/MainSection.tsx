import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { Todo } from '../models/Todo';
import Footer from './Footer';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { TodoFilters } from './TodosProvider';

interface MainSectionProps {
  activeFilter: TodoFilters;
  todos: Todo[];
  onAddTodo: (text: string) => void;
  onCompleteAllTodos: (completed: boolean) => void;
  onClearCompleted: () => void;
  onSetActiveFilter: (filter: TodoFilters) => void;
  onToggleTodoComplete: (id: number) => void;
  onEditTodo: (id: number, text: string) => void;
  onDeleteTodo: (id: number) => void;
}

export const MainSection: React.FC<MainSectionProps> = ({
  activeFilter,
  todos,
  onAddTodo,
  onCompleteAllTodos,
  onClearCompleted,
  onDeleteTodo,
  onEditTodo,
  onSetActiveFilter,
  onToggleTodoComplete,
}) => {
  const completedTodos = todos.filter((x) => x.completed);
  const [allCompleteToggled, setAllCompleteToggled] = useState(false);
  // const inProgressTodos = todos.filter((x) => !x.completed);
  const completedCount = completedTodos.length;
  const todosCount = todos.length;

  const hasTodos = !!todos.length;

  const handleOnCompleteAllTodos = () => {
    const toggled = !allCompleteToggled;
    onCompleteAllTodos(toggled);
    setAllCompleteToggled(toggled);
  };

  return (
    <>
      <Header onAddTodo={onAddTodo} />
      <section className="main">
        {hasTodos && (
          <>
            <span>
              <input
                className="toggle-all"
                type="checkbox"
                checked={completedCount === todosCount}
                onChange={handleOnCompleteAllTodos}
              />
              <label onClick={handleOnCompleteAllTodos} />
            </span>
            <TodoList
              todos={todos}
              onToggleTodoComplete={onToggleTodoComplete}
              onEditTodo={onEditTodo}
              onDeleteTodo={onDeleteTodo}
            />
            <Footer
              activeFilter={activeFilter}
              completedCount={completedCount}
              activeCount={todosCount - completedCount}
              onClearCompleted={onClearCompleted}
              onSetActiveFilter={onSetActiveFilter}
            />
          </>
        )}
      </section>
    </>
  );
};

export default function Connect() {
  const hook = useTodos();
  return (
    <MainSection
      activeFilter={hook.activeFilter}
      todos={hook.todos}
      onAddTodo={hook.addTodo}
      onCompleteAllTodos={hook.completeAllTodos}
      onClearCompleted={hook.clearCompleted}
      onDeleteTodo={hook.deleteTodo}
      onEditTodo={hook.editTodo}
      onSetActiveFilter={hook.setActiveFilter}
      onToggleTodoComplete={hook.toggleTodoComplete}
    />
  );
}
