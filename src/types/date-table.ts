import { DEFAULTROWSSIZE } from "@/components/data-table/data-table";

export type Column<T> = {
  header: string;
  accessor: keyof T;
  sortable?: boolean;
  filterable?: boolean;
  cell?: (row: T) => React.ReactNode;
  customSortAccessor?: string;
};

export type RowSize = (typeof DEFAULTROWSSIZE)[number];

export type SearchParam = {
  searchAccessor: string;
  value: string;
};
