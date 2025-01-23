import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Heading from "../Heading";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { FaRegPlayCircle } from "react-icons/fa";
import { getImageUrl } from "@/utils/getImageUrl";

const VideoSection = ({ data, heading }: PropsType) => {
  return (
    <section>
      <Heading title={heading} />

      <div className="container py-2 px-4 md:px-6 ">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-7">
          {data.map((item: any, i: number) => (
            <a href={item.link} target="_blank" key={i} className="relative">
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-25"></div>
              <Image
                className="w-full h-[201.61px] object-cover"
                src={getImageUrl(item.thumbnail)}
                width={330}
                height={201.61}
                alt="image"
              />
              <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 z-10">
                <FaRegPlayCircle className="w-[51.35px] h-[51.35px] text-red-500" />
              </div>
            </a>
          ))}
          <div className="flex justify-center md:col-span-4">
            <Link
              href="/videos"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "bg-[#D4E2FF] text-[#244B9C] md:h-10 h-9 text-xs md:text-sm font-medium rounded-3xl hover:bg-[#D4E2FF] hover:text-[#244B9C]"
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

export default VideoSection;

type PropsType = {
  data: any;
  heading: string;
  trending?: any;
  watchNow?: boolean;
};
