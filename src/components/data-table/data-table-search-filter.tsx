import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

type DataTableSearchFilterProps = {
  searchFilterAccessor: string;
};

export function DataTableSearchFilter({
  searchFilterAccessor,
}: DataTableSearchFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const defaultSearchValue = params.get("search")
    ? (JSON.parse(params.get("search")!) as { value: string })
    : { value: "" };

  const [searchFilter, setSearchFilter] = useState<string>(
    defaultSearchValue.value ?? ""
  );

  const searchData = {
    searchAccessor: searchFilterAccessor,
    value: searchFilter,
  };

  useEffect(() => {
    params.set(`search`, JSON.stringify(searchData));
    router.push(`${pathname}?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilter]);

  return (
    <Input
      value={searchFilter}
      onChange={(e) => setSearchFilter(e.target.value)}
      placeholder={`Search from ${searchFilterAccessor}...`}
      className="w-fit"
    />
  );
}
