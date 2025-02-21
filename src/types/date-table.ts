export type Column<T> = {
  header: string;
  accessor: keyof T;
  sortable?: boolean;
  cell?: (row: T) => React.ReactNode;
  customSortAccessor?: string;
};
