import { Todo } from '../models/Todo';
import { TodoList } from './TodoList';

function mountTodoList(
  todos: Todo[],
  onToggleTodoComplete = cy.spy().as('onToggleTodoComplete'),
  onEditTodo = cy.spy().as('onEditTodo'),
  onDeleteTodo = cy.spy().as('onDeleteTodo')
) {
  cy.mount(
    <div className="todo-list">
      <TodoList
        todos={todos}
        onToggleTodoComplete={onToggleTodoComplete}
        onEditTodo={onEditTodo}
        onDeleteTodo={onDeleteTodo}
      />
    </div>
  );
}

describe('TodoList', () => {
  let todos: Todo[];

  beforeEach(() => {
    todos = [
      {
        text: 'Test 1',
        completed: false,
        id: 1,
      },
      {
        text: 'Test 2',
        completed: true,
        id: 2,
      },
    ];
  });

  it('should render', () => {
    mountTodoList(todos);
    cy.get('ul').should('have.class', 'todo-list');
  });

  it('should render todos', () => {
    mountTodoList(todos);
    cy.get('li')
      .should('have.length', 2)
      .eq(0)
      .should('have.class', 'todo')
      .and('have.text', todos[0].text)
      .find('input[type=checkbox]')
      .should('not.be.checked');

    cy.get('li')
      .eq(1)
      .should('have.class', 'todo')
      .and('have.text', todos[1].text)
      .find('input[type=checkbox]')
      .should('be.checked');
  });
});
