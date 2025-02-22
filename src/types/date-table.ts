import { DEFAULTROWSSIZE } from "@/components/data-table/data-table";
import { LucideIcon } from "lucide-react";

export type Column<T> = {
  header: string;
  accessor: keyof T;
  cell?: (row: T) => React.ReactNode;
  customSortAccessor?: string;
  sortable?: boolean;
  filterable?: boolean;
  facetedFilterValues?: FacetedFilterValues[];
};

export type FacetedFilterValues = {
  value: string;
  label: string;
  icon?: LucideIcon;
};

export type RowSize = (typeof DEFAULTROWSSIZE)[number];

export type SearchParam = {
  searchAccessor: string;
  value: string;
};

export type FilterParam = {
  filterAccessor: string;
  values: string[];
};
