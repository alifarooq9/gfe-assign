"use client";

import { DataTableSortableRowHead } from "@/components/data-table/data-table-sortable-row-head";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableSearchFilter } from "@/components/data-table/data-table-search-filter";
import { Column, FacetedFilterValues } from "@/types/date-table";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { cn } from "@/lib/utils";

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  maxPage: number;
  searchFilterAccessor?: keyof T;
};

export const DEFAULTROWSSIZE = [10, 20, 30, 40, 50] as const;

export function DataTable<T>({
  columns,
  data,
  maxPage,
  searchFilterAccessor,
}: DataTableProps<T>) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {searchFilterAccessor && (
            <DataTableSearchFilter
              searchFilterAccessor={searchFilterAccessor as string}
            />
          )}

          {columns
            .filter((c) => c.filterable === true)
            .map((c, index) => (
              <DataTableFacetedFilter
                key={index}
                column={c}
                title={c.header ?? ""}
                options={c.facetedFilterValues as FacetedFilterValues[]}
              />
            ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <DataTableSortableRowHead column={column} key={index} />
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column, colIndex) => {
                    const content = column.cell
                      ? column.cell(row)
                      : (row[column.accessor as keyof T] as React.ReactNode);

                    return (
                      <TableCell
                        key={colIndex}
                        className={cn(column.cellClassName)}
                      >
                        {content}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination maxPage={maxPage} />
    </div>
  );
}
