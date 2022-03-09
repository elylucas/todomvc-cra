import { mount } from '@cypress/react';
import React from 'react';
import { Todo } from '../models/Todo';
import { TodoItem } from './TodoItem';

function mountTodoItem(
  todo: Todo,
  onToggleTodoComplete = cy.spy().as('onToggleTodoComplete'),
  editTodo = cy.spy().as('editTodo'),
  deleteTodo = cy.spy().as('deleteTodo')
) {
  mount(
    <div className="todo-list">
      <TodoItem
        todo={todo}
        onToggleTodoComplete={onToggleTodoComplete}
        onEditTodo={editTodo}
        onDeleteTodo={deleteTodo}
      />
    </div>
  );
}

describe('TodoItem', () => {
  let todo: Todo;

  beforeEach(() => {
    todo = {
      id: 10,
      text: 'Test',
      completed: false,
    };
  });

  it('should render correctly', () => {
    mountTodoItem(todo);
    cy.get('li')
      .should('have.class', 'todo')
      .find('div')
      .should('have.class', 'view');
    cy.get('input[type=checkbox]')
      .should('have.class', 'toggle')
      .and('not.be.checked');
    cy.contains('label', todo.text);
    cy.get('button').should('have.class', 'destroy');
  });

  it('input onChange should call onToggleTodoComplete', () => {
    mountTodoItem(todo);
    cy.get('input').check();
    cy.get('@onToggleTodoComplete').should('have.been.calledWith', todo.id);
  });

  it('button onClick should call deleteTodo', () => {
    mountTodoItem(todo);
    // button only becomes visible on hover, so we invoke show to display it
    cy.get('.destroy').invoke('show').click();
    cy.get('@deleteTodo').should('have.been.calledWith', todo.id);
  });

  it('label onDoubleClick should put component in edit state', () => {
    mountTodoItem(todo);
    cy.get('label').dblclick();
    cy.get('li').should('have.class', 'editing');
    cy.get('input[type=text').should('exist');
    cy.get('input[type=text').should('have.value', todo.text);
  });

  it('hitting enter on todo should call onSave', () => {
    mountTodoItem(todo);
    cy.get('label').dblclick();
    cy.focused().type('{enter}');
    cy.get('@editTodo').should('have.been.calledWith', todo.id, todo.text);
  });

  it('onSave should call deleteTodo if text is empty', () => {
    mountTodoItem(todo);
    cy.get('label').dblclick();
    cy.focused().clear().type('{enter}');
    cy.get('@deleteTodo').should('have.been.calledWith', todo.id);
  });

  it('onSave should exit component from edit state', () => {
    mountTodoItem(todo);
    cy.get('label').dblclick();
    cy.get('li').should('have.class', 'editing');
    cy.focused().type('{enter}');
    cy.get('li').should('not.have.class', 'editing');
  });
});
