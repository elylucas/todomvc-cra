import { FilterLink } from './FilterLink';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
} from '../constants/TodoFilters';
import { PropsWithChildren } from 'react';

interface FooterProps
  extends PropsWithChildren<{
    completedCount: number;
    activeCount: number;
    onSetActiveFilter: (filter: string) => void;
    onClearCompleted: () => void;
  }> {}

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed',
};

const Footer: React.FC<FooterProps> = (props) => {
  const { activeCount, completedCount, onClearCompleted } = props;
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
              filter={filter}
              onSetActiveFilter={props.onSetActiveFilter}
              text={(FILTER_TITLES as any)[filter]}
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
