import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from "@/static/socials";
import { getCurrentFormattedDate } from "@/utils/date";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 container flex md:h-12 h-[45px]  items-center justify-between gap-4 border-b border-[#E5E5E5] bg-background px-4 md:px-6">
      <h3 className="fira-sans-regular md:text-sm text-xs text-[#383838]">
        {getCurrentFormattedDate()}
      </h3>

      <div className="flex items-center gap-6">
        <div>
          <Link
            className={cn(
              buttonVariants({ variant: "destructive", size: "sm" }),
              "roboto-bold rounded-3xl text-xs hidden md:flex animate-pulse"
            )}
            href="https://epaper.easternmirrornagaland.com/"
            target="_blank"
          >
            READ e-Paper
          </Link>
        </div>

        <ul className="flex items-center md:gap-3.5 gap-2.5">
          {SOCIAL_LINKS.map((link, i) => (
            <li key={i}>
              <Link href={link.href}>{link.icon()}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
