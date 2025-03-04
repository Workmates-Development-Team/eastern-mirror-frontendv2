import { FOOTER_LINKS, NAVBAR_LINKS } from "@/constant/path";
import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from "@/static/socials";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const nagaland = [
  {
    label: "Chümoukedima",
    href: "/nagaland/chumoukedima",
  },
  {
    label: "Dimapur",
    href: "/nagaland/dimapur",
  },
  {
    label: "Kiphire",
    href: "/nagaland/kiphire",
  },
  {
    label: "Kohima",
    href: "/nagaland/kohima",
  },
  {
    label: "Longleng",
    href: "/nagaland/longleng",
  },
  {
    label: "Meluri",
    href: "/nagaland/meluri",
  },
  {
    label: "Mokokchung",
    href: "/nagaland/mokokchung",
  },
  {
    label: "Mon",
    href: "/nagaland/mon",
  },
  {
    label: "Niuland",
    href: "/nagaland/niuland",
  },
  {
    label: "Noklak",
    href: "/nagaland/noklak",
  },
  {
    label: "Peren",
    href: "/nagaland/peren",
  },
  {
    label: "Phek",
    href: "/nagaland/phek",
  },
  {
    label: "Shamator",
    href: "/nagaland/shamator",
  },
  {
    label: "Tseminyü",
    href: "/nagaland/tseminyu",
  },
  {
    label: "Tuensang",
    href: "/nagaland/tuensang",
  },
  {
    label: "Wokha",
    href: "/nagaland/wokha",
  },
  {
    label: "Zünheboto",
    href: "/nagaland/zunheboto",
  },
]

const Footer = () => {
  return (
    <div className="mt-10 bg-[#002366] pt-8 pb-16 md:px-[52px] px-[35px] container text-[#FFFFFF]">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between md:items-start gap-16">
        <div>
          <h3 className="lora-medium text-[15px] text-center md:text-start md:pb-[22px] pb-[10px] uppercase">
            Nagaland Districts
          </h3>

          <ul
            className={
              "flex md:flex-wrap flex-col md:flex-row text-center md:text-start  md:gap-3 gap-2"
            }
          >
            {nagaland.map((link, i) => (
              <li
                key={i}
                className="md:text-[15px] text-sm opacity-80 roboto-regular"
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <Link href='/'>
          <Image
            src="/images/logo-light.png"
            alt="logo-light"
            width={300}
            height={120}
          />
        </Link>
      </div>

      <div className="md:mt-12 mt-8 grid md:grid-cols-5 grid-cols-1 gap-8 md:gap-0 md:gap-y-8 text-center md:text-start">
        {FOOTER_LINKS?.map((item, i) => (
          <div
            key={i}
            className={cn(
              item.section === "Nagaland Districts" ? "col-span-2" : ""
            )}
          >
            {item?.path ? (
              <Link href={item.path}>
                {" "}
                <h3 className="lora-medium text-[15px] md:text-base md:pb-[22px] pb-[10px] uppercase">
                  {item.section}
                </h3>
              </Link>
            ) : (
              <h3 className="lora-medium text-[15px] md:text-base md:pb-[22px] pb-[10px] uppercase">
                {item.section}
              </h3>
            )}

            <ul
              className={cn(
                item.section === "Nagaland Districts"
                  ? "grid grid-cols-2"
                  : "flex flex-col ",
                "md:gap-3 gap-2"
              )}
            >
              {item.links.map((link, i) => (
                <li
                  key={i}
                  className="md:text-[15px] text-sm opacity-80 roboto-regular"
                >
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center md:mt-10 mt-8">
        <div className="md:border-t-2 border-t border-white w-full opacity-55 md:mb-10 mb-8"></div>
        <ul className="flex items-center gap-4">
          {SOCIAL_LINKS.map((link, i) => (
            <li key={i}>
              <Link href={link.href} target="_blank" className="opacity-80">
                {link.icon(30)}
              </Link>
            </li>
          ))}
        </ul>

        <nav className="flex-wrap flex md:flex-nowrap justify-center md:gap-10 gap-4 mt-8">
          {NAVBAR_LINKS.map((link, i) => {
            if(link.label === "More") return (null)
            return (
            <Link
              key={i}
              href={link.href}
              className="text-[#FFFFFF] whitespace-nowrap transition-colors text-sm md:text-base uppercase lora-regular opacity-80"
            >
              {link.label}
            </Link>
          )})}
        </nav>
      </div>
    </div>
  );
};

export default Footer;
