import { mount } from '@cypress/react';
import { TodoTextInput } from './TodoTextInput';

describe('TodoTextInput', () => {
  it('should render correctly', () => {
    mount(
      <TodoTextInput
        onSave={cy.spy()}
        text="Do something"
        placeholder="What needs to be done?"
        isEditing={false}
        isNewTodo={false}
      />
    );
    cy.get('input').should(
      'have.attr',
      'placeholder',
      'What needs to be done?'
    );
    cy.get('input').should('have.value', 'Do something');
    cy.get('input').should('not.have.class', 'edit');
    cy.get('input').should('not.have.class', 'new-todo');
  });

  it('should render correctly when isEditing=true', () => {
    mount(<TodoTextInput onSave={cy.spy()} isEditing={true} />);
    cy.get('input').should('have.class', 'edit');
  });

  it('should render correctly when isNewTodo=true', () => {
    mount(<TodoTextInput onSave={cy.spy()} isNewTodo={true} />);
    cy.get('input').should('have.class', 'new-todo');
  });

  it('should update value on change', () => {
    mount(<TodoTextInput onSave={cy.spy().as('onSave')} />);
    cy.get('input').type('Do something');
    cy.get('input').should('have.value', 'Do something');
  });

  it('should call onSave on return key press', () => {
    mount(<TodoTextInput onSave={cy.spy().as('onSave')} />);
    cy.get('input').type('Do something{enter}');
    cy.get('@onSave').should('have.been.calledWith', 'Do something');
  });

  it('should reset state on return key press if newTodo', () => {
    mount(<TodoTextInput onSave={cy.spy().as('onSave')} isNewTodo={true} />);
    cy.get('input').type('Do something');
    cy.get('input').should('have.value', 'Do something');
    cy.get('input').type('{enter}');
    cy.get('input').should('have.value', '');
  });

  it('should call onSave on blur', () => {
    mount(<TodoTextInput onSave={cy.spy().as('onSave')} />);
    cy.get('input').type('Do something');
    cy.get('input').blur();
    cy.get('@onSave').should('have.been.calledWith', 'Do something');
  });

  it('shouldnt call onSave on blur if newTodo', () => {
    mount(<TodoTextInput onSave={cy.spy().as('onSave')} isNewTodo={true} />);
    cy.get('input').type('Do something');
    cy.get('input').blur();
    cy.get('@onSave').should('not.have.been.calledWith');
  });

  it('after type and hitting enter, the textbox should be cleared and onSave should be called', () => {
    mount(<TodoTextInput onSave={cy.spy().as('onSave')} isNewTodo={true} />);
    cy.get('input').type('abc123{enter}');
    cy.get('input').should('have.value', '');
    cy.get('@onSave').should('have.been.calledWith', 'abc123');
  });
});
