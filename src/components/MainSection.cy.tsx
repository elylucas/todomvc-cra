import { getTodoInfo, Todo, TodoFilters } from '../models/Todo';
import { MainSection } from './MainSection';

describe('<MainSection />', () => {
  let todos: Todo[];

  beforeEach(() => {
    todos = [];
  });

  it('should render', () => {
    mountMainSection(todos);
    cy.get('section').should('have.class', 'main');
  });

  describe('header', () => {
    it('adding a new todo adds it to the list', () => {
      mountMainSection([]);
      cy.get('header input[type=text]').type('test123{enter}');
      cy.get('@onAddTodo').should('have.been.calledWith', 'test123');
    });
  });

  describe('all input toggle', () => {
    beforeEach(() => {
      todos = [
        {
          id: 1,
          text: 'Todo 1',
          completed: true,
        },
        {
          id: 2,
          text: 'Todo 2',
          completed: true,
        },
      ];
    });

    it('should render toggle all input', () => {
      mountMainSection(todos);
      cy.get('input[type=checkbox]')
        .should('have.class', 'toggle-all')
        .and('be.checked');
    });

    it('should be checked if all todos completed', () => {
      mountMainSection(todos);
      cy.get('input[type=checkbox].toggle-all').should('be.checked');
    });

    it('should call completeAllTodos on change', () => {
      mountMainSection(todos);
      cy.get('.toggle-all+label').click({ force: true });
      cy.get('@onCompleteAllTodos').should('have.been.calledWith', true);
      //untoggle
      // cy.get('@onCompleteAllTodos').invoke('resetHistory');
      cy.get('.toggle-all+label').click({ force: true });
      cy.get('@onCompleteAllTodos')
        .invoke('getCall', 1)
        .should('have.been.calledWith', false);
    });
  });

  describe('footer', () => {
    it('should render footer', () => {
      todos = [
        {
          id: 1,
          text: 'Todo 1',
          completed: false,
        },
      ];
      mountMainSection(todos);
      cy.get('footer').contains('1 item left');
    });

    it('clicking Clear completed button should call onClearCompleted', () => {
      todos = [
        {
          id: 1,
          text: 'Todo 1',
          completed: true,
        },
      ];
      mountMainSection(todos);
      cy.contains('button', 'Clear completed').click();
      cy.get('@onClearCompleted').should('have.been.called');
    });

    it('clicking on a filter should set the active filter', () => {
      todos = [
        {
          id: 1,
          text: 'Todo 1',
          completed: true,
        },
      ];
      mountMainSection(todos);
      cy.get('a').contains('Active').click();
      cy.get('@onSetActiveFilter').should(
        'have.been.calledWith',
        'show_active'
      );
    });
  });

  describe('todo list', () => {
    it('should render a list', () => {
      todos = [
        {
          id: 1,
          text: 'Todo 1',
          completed: false,
        },
        {
          id: 2,
          text: 'Todo 2',
          completed: false,
        },
        {
          id: 3,
          text: 'Todo 3',
          completed: false,
        },
      ];
      mountMainSection(todos);
      cy.get('li.todo').should('have.length', 3);
    });

    it('should call toggleTodoComplete when clicking a todo', () => {
      todos = [
        {
          id: 1,
          text: 'Todo 1',
          completed: false,
        },
      ];
      mountMainSection(todos);
      cy.contains('li.todo', todos[0].text).find('input').click();
      cy.get('@onToggleTodoComplete').should(
        'have.been.calledWith',
        todos[0].id
      );
    });

    it('should call toggleTodoComplete when clicking 2nd todo', () => {
      todos = [
        {
          id: 1,
          text: 'Todo 1',
          completed: false,
        },
        {
          id: 2,
          text: 'Todo 2',
          completed: false,
        },
      ];
      mountMainSection(todos);
      cy.contains('li.todo', todos[1].text).find('input').click();
      cy.get('@onToggleTodoComplete')
        .should('have.been.calledWith', todos[1].id)
        .and('not.have.been.calledWith', todos[0].id);
    });

    it('should call onDeleteTodo when clicking the delete button on a todo', () => {
      todos = [
        {
          id: 1,
          text: 'Todo 1',
          completed: false,
        },
      ];
      mountMainSection(todos);
      cy.contains('li.todo', todos[0].text)
        .find('button.destroy')
        .click({ force: true });
      cy.get('@onDeleteTodo').should('have.been.calledWith', todos[0].id);
    });

    it('should call onEditTodo when double clicking and saving a todo', () => {
      todos = [
        {
          id: 1,
          text: 'Todo 1',
          completed: false,
        },
      ];
      mountMainSection(todos);
      cy.contains('li.todo', todos[0].text).as('li').find('label').dblclick();
      cy.get('@li').find('input[type=text]').type(' test123{enter}');
      cy.get('@onEditTodo').should(
        'have.been.calledWith',
        todos[0].id,
        todos[0].text + ' test123'
      );
    });

    it('should call onDeleteTodo when double clicking and saving a todo with no text', () => {
      todos = [
        {
          id: 1,
          text: 'Todo 1',
          completed: false,
        },
      ];
      mountMainSection(todos);
      cy.contains('li.todo', todos[0].text).as('li').find('label').dblclick();
      cy.get('@li').find('input[type=text]').clear().type('{enter}');
      cy.get('@onDeleteTodo').should('have.been.calledWith', todos[0].id);
    });

    it('when there are no todos, the main list and footer should be hidden', () => {
      mountMainSection([]);
      cy.get('.todo-list').should('not.exist');
      cy.get('.footer').should('not.exist');
    });
  });
});

function mountMainSection(todos: Todo[], filter: TodoFilters = 'show_all') {
  const todoInfo = getTodoInfo(todos, filter);

  return cy.mount(
    <MainSection
      onAddTodo={cy.spy().as('onAddTodo')}
      onCompleteAllTodos={cy.spy().as('onCompleteAllTodos')}
      onClearCompleted={cy.spy().as('onClearCompleted')}
      onEditTodo={cy.spy().as('onEditTodo')}
      onDeleteTodo={cy.spy().as('onDeleteTodo')}
      onSetActiveFilter={cy.spy().as('onSetActiveFilter')}
      onToggleTodoComplete={cy.spy().as('onToggleTodoComplete')}
      todoInfo={todoInfo}
    />
  );
}
