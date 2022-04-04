import React from 'react';
import { mount } from '@cypress/react';
import Footer from './Footer';
import { TodoFilters } from './TodosProvider';

describe('<Footer />', () => {
  it('should render', () => {
    mountFooter();
    cy.get('footer').should('have.class', 'footer');
  });

  it('should display "No Items Left" when active count is 0', () => {
    mountFooter({ activeCount: 0 });
    cy.get('footer').contains('No items left');
  });

  it('should display active count when above 0', () => {
    mountFooter({ activeCount: 1 });
    cy.get('footer').contains('1 item left');
  });

  it('should render filters', () => {
    mountFooter();
    cy.get('footer li')
      .should('have.length', 3)
      .should((li) => {
        expect(li[0]).to.have.text('All');
        expect(li[1]).to.have.text('Active');
        expect(li[2]).to.have.text('Completed');
      });
  });

  it('should render clear button when completed todos', () => {
    mountFooter({ completedCount: 1 });
    cy.contains('button', 'Clear completed').should(
      'have.class',
      'clear-completed'
    );
  });

  it('shouldnt show clear button when no completed todos', () => {
    mountFooter({ completedCount: 0 });
    cy.contains('button', 'Clear completed').should('not.exist');
  });

  it('should call onClearCompleted on clear button click', () => {
    mountFooter({ completedCount: 1 });
    cy.contains('button', 'Clear completed').click();
    cy.get('@onClearCompleted').should('have.been.called');
  });
});

function mountFooter(
  options: {
    activeCount?: number;
    completedCount?: number;
    onClearCompleted?: () => void;
  } = {}
) {
  const props = {
    activeFilter: 'show_all' as TodoFilters,
    activeCount: 0,
    completedCount: 0,
    onClearCompleted: cy.spy().as('onClearCompleted'),
    onSetActiveFilter: cy.spy().as('onSetActiveFilter'),
    ...options,
  };
  mount(<Footer {...props} />);
}
