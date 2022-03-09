import { useTodos } from '../hooks/useTodos';
import { Todo } from '../models/Todo';
import Footer from './Footer';
import { Header } from './Header';
import { TodoList } from './TodoList';

interface MainSectionProps {
  todos: Todo[];
  onAddTodo: (text: string) => void;
  onCompleteAllTodos: () => void;
  onClearCompleted: () => void;
  onSetActiveFilter: (filter: string) => void;
  onToggleTodoComplete: (id: number) => void;
  onEditTodo: (id: number, text: string) => void;
  onDeleteTodo: (id: number) => void;
}

export const MainSection: React.FC<MainSectionProps> = ({
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
  // const inProgressTodos = todos.filter((x) => !x.completed);
  const completedCount = completedTodos.length;
  const todosCount = todos.length;

  return (
    <>
      <Header onAddTodo={onAddTodo} />
      <section className="main">
        {!!todos.length && (
          <span>
            <input
              className="toggle-all"
              type="checkbox"
              checked={completedCount === todosCount}
              onClick={onCompleteAllTodos}
              onChange={onCompleteAllTodos}
            />
            <label data-cy-toggle-all onClick={onCompleteAllTodos} />
          </span>
        )}
        <TodoList
          todos={todos}
          onToggleTodoComplete={onToggleTodoComplete}
          onEditTodo={onEditTodo}
          onDeleteTodo={onDeleteTodo}
        />
        <Footer
          completedCount={completedCount}
          activeCount={todosCount - completedCount}
          onClearCompleted={onClearCompleted}
          onSetActiveFilter={onSetActiveFilter}
        />
      </section>
    </>
  );
};

export default function Connect() {
  const hook = useTodos();
  return (
    <MainSection
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
