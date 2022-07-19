import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { TodoFilters, TodoInfo } from '../models/Todo';
import Footer from './Footer';
import { Header } from './Header';
import { TodoList } from './TodoList';

interface MainSectionProps {
  onAddTodo: (text: string) => void;
  onCompleteAllTodos: (completed: boolean) => void;
  onClearCompleted: () => void;
  onSetActiveFilter: (filter: TodoFilters) => void;
  onToggleTodoComplete: (id: number) => void;
  onEditTodo: (id: number, text: string) => void;
  onDeleteTodo: (id: number) => void;
  todoInfo: TodoInfo;
}

export const MainSection: React.FC<MainSectionProps> = ({
  onAddTodo,
  onCompleteAllTodos,
  onClearCompleted,
  onDeleteTodo,
  onEditTodo,
  onSetActiveFilter,
  onToggleTodoComplete,
  todoInfo,
}) => {
  // const completedTodos = todos.filter((x) => x.completed);
  const [allCompleteToggled, setAllCompleteToggled] = useState(false);
  // const completedCount = completedTodos.length;

  const hasTodos = !!todoInfo.total;

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
                checked={todoInfo.complete === todoInfo.total}
                onChange={handleOnCompleteAllTodos}
              />
              <label onClick={handleOnCompleteAllTodos} />
            </span>

            <TodoList
              todos={todoInfo.filteredTodos}
              onToggleTodoComplete={onToggleTodoComplete}
              onEditTodo={onEditTodo}
              onDeleteTodo={onDeleteTodo}
            />

            <Footer
              activeFilter={todoInfo.filter}
              completedCount={todoInfo.complete}
              activeCount={todoInfo.active}
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
      onAddTodo={hook.addTodo}
      onCompleteAllTodos={hook.completeAllTodos}
      onClearCompleted={hook.clearCompleted}
      onDeleteTodo={hook.deleteTodo}
      onEditTodo={hook.editTodo}
      onSetActiveFilter={hook.setActiveFilter}
      onToggleTodoComplete={hook.toggleTodoComplete}
      todoInfo={hook.todoInfo}
    />
  );
}
