"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const sortingOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "A - Z", value: "az" },
  { label: "Z - A", value: "za" },
];

interface SortingProps {
  setOrder: (value: string) => void;
  setSort: (value: string) => void;
}

export default function Sorting({ setOrder, setSort }: SortingProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("newest");

  React.useEffect(() => {
    if (value === "newest") {
      setSort("createdAt");
      setOrder("desc");
    } else if (value === "oldest") {
      setSort("createdAt");
      setOrder("asc");
    } else if (value === "az") {
      setSort("title");
      setOrder("asc");
    } else if (value === "za") {
      setSort("title");
      setOrder("desc");
    }
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[170px] justify-between"
        >
          {value
            ? sortingOptions.find(
                (sortingOption) => sortingOption.value === value
              )?.label
            : "Newest"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[170px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {sortingOptions.map((sortingOption) => (
                <CommandItem
                  key={sortingOption.value}
                  value={sortingOption.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === sortingOption.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {sortingOption.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
