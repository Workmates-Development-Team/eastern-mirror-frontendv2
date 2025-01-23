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

type CategoryProps = {
  name: string;
  _id: string;
};

export default function SelexBox({
  onChange,
  data,
}: {
  onChange: (value: string) => void;
  data?: {
    _id: string;
    parent: string
  };
}) {
  const [categories, setCategories] = React.useState<CategoryProps[]>([]);

  const getCategories = async () => {
    try {
      const { data } = await axiosInstance.get(`/category/all/cat`);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(data?.parent || "");

  React.useEffect(() => {
    if (value) {
      onChange(value);
    }
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? categories.find((category) => String(category._id )=== value)?.name
            : "Select category..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category._id}
                  value={category._id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {category.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === category._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
