import { FilterLink } from './FilterLink';
import { PropsWithChildren } from 'react';
import { TodoFilters } from '../models/Todo';

interface FooterProps
  extends PropsWithChildren<{
    activeFilter: TodoFilters;
    completedCount: number;
    activeCount: number;
    onSetActiveFilter: (filter: TodoFilters) => void;
    onClearCompleted: () => void;
  }> {}

const FILTER_TITLES: Record<TodoFilters, string> = {
  show_all: 'All',
  show_active: 'Active',
  show_completed: 'Completed'
};

const Footer: React.FC<FooterProps> = ({
  activeFilter,
  activeCount,
  completedCount,
  onClearCompleted,
  onSetActiveFilter
}) => {
  const itemWord = activeCount === 1 ? 'item' : 'items';
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
      <ul className="filters">
        {Object.keys(FILTER_TITLES).map((filter) => (
          <li key={filter}>
            <FilterLink
              activeFilter={activeFilter}
              filter={filter as TodoFilters}
              onSetActiveFilter={onSetActiveFilter}
              text={FILTER_TITLES[filter as TodoFilters]}
            />
          </li>
        ))}
      </ul>
      {!!completedCount && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
