import React from "react";
import Heading from "../Heading";
import BigCard from "../card/BigCard";
import SmallCard from "../card/SmallCard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Section1 = ({ data, heading, link }: PropsType) => {
  if (!data?.length) return null;
  return (
    <section>
      <Heading title={heading} />

      <div className="container py-2 px-4 md:px-6 grid md:grid-cols-2 grid-cols-1 md:gap-7 gap-4">
        <BigCard data={data[0]} />

        <div className="flex flex-col md:gap-5 gap-3">
          {data.slice(1, 4).map((item: any, i: number) => (
            <SmallCard
              data={item}
              key={i}
              isBorder={i !== data.slice(1, 4).length - 1}
            />
          ))}

          <div className="flex justify-center">
            <Link
              href={link || "#"}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "bg-[#D4E2FF] text-[#244B9C] md:h-10 h-9 text-xs md:text-sm font-medium rounded-3xl hover:bg-[#D4E2FF] hover:text-[#244B9C] "
              )}
            >
              View more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;

type PropsType = {
  data: any;
  heading: string;
  link?: string;
};
