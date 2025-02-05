"use client";

import { IoShareSocial } from "react-icons/io5";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { getImageUrl } from "@/utils/getImageUrl";
import { formatDate } from "@/utils/date";

const BigCard = ({ data }: { data: PropsType }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/${data?.slug}`;
    const shareData = {
      title: data.title,
      text: data.title,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    } else {
      console.warn("Web Share API not supported. Copy link fallback");
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert("Link copied to clipboard!");
      });
    }
  };

  return (
    <div>
      <div className="relative">
        <div
          onClick={handleShare}
          className="bg-black bg-opacity-10 cursor-pointer absolute backdrop-blur-sm w-[30.71px] h-[30.71px] flex items-center justify-center rounded-sm top-3 right-5"
        >
          <IoShareSocial className="w-[22.63px] h-[22.63px] text-white" />
        </div>

        <Link
          href={"/" + data?.slug}
          className="w-full md:h-[440px] h-[220px]  relative"
        >
          {isLoading && (
            <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg"></div>
          )}

          <Image
            className="w-full md:h-[440px] h-[220px]  object-cover"
            width={500}
            height={440}
            src={getImageUrl(data?.thumbnail)}
            alt={data.title}
            onLoadingComplete={() => setIsLoading(false)}
          />
        </Link>
        <div className="-mt-12 relative w-[95%] mx-auto">
          <div className="bg-white md:px-[22px] px-3.5 py-2.5 shadow-md">
            <div className="flex items-center justify-between uppercase md:text-xs text-[10px]">
              <div>
                <span>Published on </span>{" "}
                <span>{formatDate(data?.publishedAt)}</span>
              </div>

              <div>
                <span>BY </span>
                {data?.author?.name ? (
                  <Link
                    href={`/author/${data.author.username}`}
                    className="font-medium underline"
                  >
                    {data.author.name}
                  </Link>
                ) : (
                  <span className="font-medium italic">Unknown Author</span>
                )}
              </div>
            </div>
            <Link href={"/" + data?.slug}>
              <h2 className="lora-bold pt-1.5 md:text-xl text-base leading-5 sm:leading-normal">
                {data?.title}
              </h2>
            </Link>
          </div>
          {/* <div
            dangerouslySetInnerHTML={{
              __html: data?.content.slice(0, 137) + "...",
            }}
            className="md:pt-5 mt-3 md:px-5 w-[90%] md:text-sm text-xs roboto-regular text-[#646464]"
          ></div> */}
        </div>
      </div>
    </div>
  );
};

export default BigCard;

type PropsType = {
  title: string;
  content: string;
  author: {
    name: string;
    username: string;
  };
  publishedAt: string;
  url: string;
  thumbnail: string;
  slug: string;
};
