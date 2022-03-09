
export interface FilterLinkProps {
  filter: string;
  onSetActiveFilter: (filteR: string) => void;
  text: string;
}

export const FilterLink: React.FC<FilterLinkProps> = ({
  filter,
  onSetActiveFilter,
  text,
}) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a
    className={`${filter === text ? 'selected' : ''}`}
    style={{ cursor: 'pointer' }}
    onClick={() => onSetActiveFilter(text)}
  >
    {text}
  </a>
);
