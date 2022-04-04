
declare global {
  namespace Cypress {
    interface Chainable {
      createDefaultTodos(): Cypress.Chainable<Element>;
      createTodo(text: string): Cypress.Chainable<Element>;
    }
  }
}

export { };
