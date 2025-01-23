import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Heading from "../Heading";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { FaRegPlayCircle } from "react-icons/fa";
import StoryCard from "../card/StoryCard";

const EditorPicksSection = ({ data, heading }: PropsType) => {
  return (
    <section>
      <Heading title={heading} />

      <div className="container py-2 px-4 md:px-6 ">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-7">
          {data.map((item: any, i: number) => (
            <StoryCard key={i} item={item} />
          ))}
          <div className="flex justify-center col-span-4">
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "bg-[#D4E2FF] text-[#244B9C] font-medium rounded-3xl hover:bg-[#D4E2FF] hover:text-[#244B9C]"
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

export default EditorPicksSection;

type PropsType = {
  data: any;
  heading: string;
  trending?: any;
  watchNow?: boolean;
};
