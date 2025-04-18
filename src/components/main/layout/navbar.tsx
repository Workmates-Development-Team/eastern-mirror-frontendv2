"use client";

import Link from "next/link";
import { ChevronDown, Menu, Search } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { NAVBAR_LINKS } from "@/constant/path";
import { cn } from "@/lib/utils";
import NavMenu from "./nav-menu";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleMenu = (index: number) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <>
      <div className="container px-4 md:px-6 flex justify-center mb-4">
        <Link href="/">
          <Image
            width={395}
            height={153}
            className="md:w-[395px] md:h-[153px] w-[300px] h-[130px]"
            src="/images/logo.webp"
            alt="logo"
          />
        </Link>
      </div>

      <header className="sticky z-20 md:top-12 top-[45px] container flex h-16 items-center gap-4 bg-[#002366] px-4 md:px-6">
        <nav className="hidden flex-col gap-6 md:flex md:flex-row md:items-center md:gap-5 lg:gap-6">
          <NavMenu links={NAVBAR_LINKS} />

          {/* <Link
            href="/advertisment"
            className={cn(
              buttonVariants({ size: "sm" }),
              "text-[#002366] whitespace-nowrap transition-colors lora-regular text-sm rounded-3xl bg-[#FFFFFF] hover:bg-[#eeeded]"
            )}
          >
            ADVERTISEMENT
          </Link> */}
        </nav>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="overflow-auto">
            <nav className="grid gap-6 text-lg font-regular">
              {NAVBAR_LINKS.map((link, i) =>
                link?.subLinks?.length ? (
                  <div key={i}>
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleMenu(i)}
                    >
                      <span className="text-muted-foreground hover:text-foreground capitalize">
                        {link.label}
                      </span>
                      <ChevronDown
                        className={`transition-transform ${
                          openMenu === i ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {openMenu === i && (
                      <div className="flex flex-col bg-secondary mt-4 p-4 rounded-lg gap-4">
                        {link?.subLinks?.map((item, j) => (
                          <Link
                            key={j}
                            href={link.href === "/education" ? item.href : link.href + item.href}
                            className="text-muted-foreground hover:text-foreground capitalize"
                            onClick={handleLinkClick}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}

                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground capitalize"
                    key={i}
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </Link>
                )
              )}

              {/* <Link
                href="/advertisment"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "whitespace-nowrap transition-colors lora-regular text-sm rounded-3xl"
                )}
              >
                ADVERTISEMENT
              </Link> */}
            </nav>
          </SheetContent>
        </Sheet>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/search?q=${search}`);
          }}
          className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2"
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search..."
            className="py-1 outline-none bg-transparent text-white border-b max-w-[150px]"
          />
          <Button
            variant="ghost"
            className="hover:bg-transparent"
            size={"icon"}
          >
            <Search className="text-white" />
          </Button>
        </form>
      </header>
    </>
  );
}
