"use client";

import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/date";
import { getImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const SmallCard = ({ data, isBorder }: PropsType) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={cn(
        isBorder ? "md:border-b-2 border-b" : "",
        " border-[#DDDDDD] md:pb-4 pb-3 grid grid-cols-6 md:gap-7 gap-2"
      )}
    >
      <div className="col-span-4 flex flex-col justify-center">
        <Link href={"/" + data?.slug}>
          <h2 className="text-[#080F18] text-sm lora-bold md:text-lg leading-tight md:leading-normal md:pb-2.5 pb-2">
            {data?.title}
          </h2>
        </Link>
        {/* <div
          dangerouslySetInnerHTML={{
            __html: data?.content.slice(0, 101).trim() + "...",
          }}
          className="text-[#646464] md:text-sm text-xs md:pb-2.5 pb-1.5"
        ></div> */}
        <p className="text-xs hidden md:block text-[#BBBBBB]">
          {formatDate(data?.publishedAt)}
        </p>
      </div>

      <div className="col-span-2">
        <Link href={"/" + data?.slug} className="h-[117px] relative">
          {isLoading && (
            <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg"></div>
          )}
          <Image
            width={199}
            height={117}
            className="w-full h-[117px] rounded-xl object-cover"
            src={getImageUrl(data?.thumbnail)}
            alt={data.title}
            onLoadingComplete={() => setIsLoading(false)}
          />
        </Link>
      </div>
    </div>
  );
};

export default SmallCard;

type PropsType = {
  data: {
    title: string;
    content: string;
    author: {
      name: string;
    };
    publishedAt: string;
    url: string;
    thumbnail: string;

    slug: string;
  };

  isBorder: boolean;
};
