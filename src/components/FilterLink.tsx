import { TodoFilters } from './TodosProvider';

export interface FilterLinkProps {
  activeFilter: TodoFilters;
  filter: TodoFilters;
  onSetActiveFilter: (filter: TodoFilters) => void;
  text: string;
}

export const FilterLink: React.FC<FilterLinkProps> = ({
  activeFilter,
  filter,
  onSetActiveFilter,
  text,
}) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a
    className={`${activeFilter === filter ? 'selected' : ''}`}
    style={{ cursor: 'pointer' }}
    onClick={() => onSetActiveFilter(filter)}
  >
    {text}
  </a>
);
