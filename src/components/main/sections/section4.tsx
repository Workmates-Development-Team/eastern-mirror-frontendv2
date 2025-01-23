import { Button, buttonVariants } from "@/components/ui/button";
import Heading from "../Heading";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { FaRegPlayCircle } from "react-icons/fa";
import StoryCard from "../card/StoryCard";

const Section4 = ({ data, heading, link }: PropsType) => {
  if (!data?.length) return null;
  return (
    <section>
      <Heading title={heading} />

      <div className="container py-2 px-4 md:px-6 ">
        <div className="grid md:grid-cols-4 grid-cols-1 md:gap-7 gap-5">
          {data.map((item: any, i: number) => (
            <StoryCard key={i} item={item} />
          ))}
          {link ? (
            <div className="flex justify-center md:col-span-4">
              <Link
                href={link || "#"}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "bg-[#D4E2FF] text-[#244B9C] font-medium md:h-10 h-9 text-xs md:text-sm rounded-3xl hover:bg-[#D4E2FF] hover:text-[#244B9C]"
                )}
              >
                View more
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Section4;

type PropsType = {
  data: any;
  heading: string;
  trending?: any;
  watchNow?: boolean;
  link?: string;
};
