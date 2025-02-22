import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Column, FacetedFilterValues, FilterParam } from "@/types/date-table";
import { CheckIcon, PlusCircleIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { getTasksSchema } from "@/app/_lib/actions";

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

  const [values, setValues] = useState<string[]>([]);

  const filterData: FilterParam[] = JSON.parse(params.get("filter") ?? "[]");

  const columnAccessor = column.customSortAccessor ?? column.accessor;

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
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
