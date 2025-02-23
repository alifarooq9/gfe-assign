import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Column, FacetedFilterValues, FilterParam } from "@/types/date-table";
import { PlusCircleIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";

type DataTableFacetedFilterProps<T> = {
  column: Column<T>;
  title: string;
  options: FacetedFilterValues[];
};

export function DataTableFacetedFilter<T>({
  title,
  column,
  options,
}: DataTableFacetedFilterProps<T>) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const filterData: FilterParam[] = JSON.parse(params.get("filter") ?? "[]");

  const columnAccessor = column.customSortAccessor ?? column.accessor;

  const [values, setValues] = useState<string[]>(
    filterData?.find((f) => f.filterAccessor === columnAccessor)?.values ?? []
  );

  const filtersWithoutCurrentColumn = filterData?.filter(
    (f) => f.filterAccessor !== columnAccessor
  );

  const columnFilterData = [
    ...(filtersWithoutCurrentColumn! ?? undefined),
    {
      filterAccessor: columnAccessor,
      values,
    },
  ];

  useEffect(() => {
    params.set(`filter`, JSON.stringify(columnFilterData));
    router.push(`${pathname}?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="border-dashed text-xs"
        >
          <PlusCircleIcon />
          {title}

          {values.length > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-border">{" | "}</span>
              {values.length <= 2 ? (
                <span className="gap-1 flex items-center">
                  {values.map((v) => (
                    <Badge
                      variant="secondary"
                      key={v}
                      className="font-normal px-1.5"
                    >
                      {
                        column.facetedFilterValues?.find((f) => f.value === v)
                          ?.label
                      }
                    </Badge>
                  ))}
                </span>
              ) : (
                <Badge variant="secondary" className="font-normal px-1.5">
                  {values.length} selected
                </Badge>
              )}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No {title} found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    if (values.includes(currentValue)) {
                      setValues(values.filter((v) => v !== currentValue));
                    } else {
                      setValues([...values, currentValue]);
                    }
                  }}
                >
                  <Checkbox
                    checked={values.includes(option.value)}
                    className="border-muted-foreground"
                  />
                  {option.icon && (
                    <option.icon className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
            {values.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    className="text-center"
                    onSelect={() => setValues([])}
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
