"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function NavMenu({ links }: PropsType) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-col gap-6 md:flex md:flex-row md:items-center md:gap-5 lg:gap-6">
        {links?.map((item: LinksInstance, i: number) => (
          <NavigationMenuItem
            key={i}
            className="text-white hover:text-white relative group"
          >
            {item?.subLinks?.length ? (
              <>
                <NavigationMenuTrigger className="!bg-transparent text-white hover:text-white hover:bg-transparent focus:bg-transparent py-0 px-0">
                  <Link
                    key={i}
                    href={item.href}
                    className="text-[#FFFFFF] uppercase whitespace-nowrap transition-colors lora-regular text-sm"
                  >
                    {item.label}
                  </Link>
                </NavigationMenuTrigger>

                <NavigationMenuContent>
                  <ul className="grid p-4 min-w-[150px]">
                    {item.subLinks.map((subLink: SubLink, i: number) => (
                      <ListItem
                        key={i}
                        href={ item.href === '/education'?subLink.href : item.href + subLink.href}
                        title={subLink.label}
                        className="whitespace-nowrap"
                      >
                        {subLink.label}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink className="text-[#FFFFFF] uppercase whitespace-nowrap transition-colors lora-regular text-sm">
                  {item.label}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}

        <NavigationMenuItem></NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            href={href || ''}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            ref={ref}  // Make sure you pass the ref to the Link element if needed
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);

ListItem.displayName = "ListItem";

interface SubLink {
  label: string;
  href: string;
}

interface LinksInstance {
  label: string;
  href: string;
  subLinks?: SubLink[];
}

type PropsType = {
  links: LinksInstance[];
};
