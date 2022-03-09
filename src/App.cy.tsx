import { mount } from '@cypress/react';
import App from './App';

describe('<App />', () => {
  it('renders', () => {
    mountApp();
  });

  it('adding a new todo adds it to the list', () => {
    mountApp();
    cy.get('header input[type=text]').type('test 123')
  })
});

function mountApp() {
  mount(<App />);
}
