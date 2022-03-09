import { useContext } from 'react';
import { TodosContext } from '../components/TodosProvider';

export const useTodos = () => {
  const todosContext = useContext(TodosContext);

  return {
    addTodo: todosContext.addTodo,
    completeAllTodos: todosContext.completeAllTodos,
    clearCompleted: todosContext.clearCompleted,
    editTodo: todosContext.editTodo,
    deleteTodo: todosContext.deleteTodo,
    setActiveFilter: todosContext.setActiveFilter,
    todos: todosContext.todos,
    toggleTodoComplete: todosContext.toggleTodoComplete
  }
}