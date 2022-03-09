import React from 'react';
import { mount } from '@cypress/react';
import { FilterLink, FilterLinkProps } from './FilterLink';

describe('<FilterLink />', () => {
  it('should render', () => {
    mountFilterLink({ text: 'All' });
    cy.get('a').contains('All');
  });

  it('should have class selected if is active', () => {
    mountFilterLink({ text: 'All', filter: 'All' });
    cy.get('a').should('have.class', 'selected');
  });

  it('should not have class selected if not active', () => {
    mountFilterLink({ text: 'All', filter: 'Completed' });
    cy.get('a').should('not.have.class', 'selected');
  });

  it('should call setFilter on click', () => {
    mountFilterLink();
    cy.get('a').click();
    cy.get('@onSetActiveFilter').should('have.been.called');
  });
});

function mountFilterLink(options: Partial<FilterLinkProps> = {}) {
  const {...props }: FilterLinkProps = {
    filter: '',
    text: 'Link Text',
    onSetActiveFilter: cy.spy().as('onSetActiveFilter'),
    ...options,
  };
  mount(<FilterLink {...props} />);
}
