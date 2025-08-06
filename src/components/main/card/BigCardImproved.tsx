"use client";

import { IoShareSocial } from "react-icons/io5";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { getImageUrl } from "@/utils/getImageUrl";
import { formatDate } from "@/utils/date";

const BigCardImproved = ({ data }: { data: PropsType }) => {
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
          className="bg-black bg-opacity-10 cursor-pointer absolute z-10 backdrop-blur-sm w-[30.71px] h-[30.71px] flex items-center justify-center rounded-sm top-3 right-5"
        >
          <IoShareSocial className="w-[22.63px] h-[22.63px] text-white" />
        </div>

        <Link
          href={"/" + data?.slug}
          className="block w-full"
        >
          {/* Fixed aspect ratio container to prevent CLS */}
          <div 
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: '16/9' }}
          >
            {isLoading && (
              <div className="absolute inset-0 bg-gray-300 animate-pulse" />
            )}

            <Image
              className="object-cover transition-opacity duration-300"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              src={getImageUrl(data?.thumbnail)}
              alt={data.title}
              onLoad={() => setIsLoading(false)}
              priority={true}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              style={{
                opacity: isLoading ? 0 : 1,
              }}
            />
          </div>
        </Link>

        {/* Content overlay with fixed positioning */}
        <div className="relative -mt-12 w-[95%] mx-auto">
          <div className="bg-white md:px-[22px] px-3.5 py-2.5 shadow-md min-h-[80px]">
            <div className="flex items-center justify-between uppercase md:text-xs text-[10px] mb-3">
              <div className="min-w-0 flex-1">
                <span>Published on </span>
                <span>{formatDate(data?.publishedAt)}</span>
              </div>

              <div className="min-w-0 flex-1 text-right">
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
              <h2 className="lora-bold pt-1.5 md:text-xl text-base leading-5 sm:leading-normal min-h-[2.5rem] line-clamp-2">
                {data?.title}
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigCardImproved;

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
