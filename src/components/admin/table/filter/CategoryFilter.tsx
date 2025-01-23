"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

interface CategoryProps {
  category: string;
  setCategory: (value: string) => void;
}

export default function CategoryFilter({
  category: value,
  setCategory: setValue,
}: CategoryProps) {
  const [open, setOpen] = React.useState(false);

  const getCategories = async () => {
    const { data } = await axiosInstance.get("/category/all/cat");
    return data;
  };

  const { data = [] } = useQuery({
    queryKey: ["categories-all"],
    queryFn: getCategories,
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const categories = [
    { value: "", label: "All" },
    ...data.map((item: any) => ({
      label: item.name,
      value: item.slug,
    })),
  ];

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
            ? categories.find((category: any) => category.value === value)
                ?.label
            : "All category"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="All category" />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category: any) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
