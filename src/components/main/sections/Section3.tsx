import React from "react";
import Heading from "../Heading";
import BigCard from "../card/BigCard";
import SmallCard from "../card/SmallCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { IoShareSocial } from "react-icons/io5";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "@/utils/getImageUrl";
import { formatDate } from "@/utils/date";

const Section3 = ({ data, heading, trending, watchNow, link }: PropsType) => {
  if (!data?.length) return null;

  const handleShare = async (item: any) => {
    const shareUrl = `${window.location.origin}/details/${item?.slug}`;
    const shareData = {
      title: item.title,
      text: item.title,
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
    <section className="px-4 md:px-6">
      <div className="container py-2 bg-[#002366] md:mt-20 mt-12 md:rounded-[21px] rounded-2xl md:pt-10 pt-4 pb-4 md:px-20 px-4 text-white">
        <div className="flex justify-between  md:mb-4 mb-3">
          <h2 className="lora-medium text-xl text-white">{heading}</h2>
        </div>

        {trending?.length ? (
          <div className="flex items-center gap-4 ">
            <p className="roboto-medium md:text-lg text-sm">Trending</p>
            <ul className="flex flex-wrap  md:gap-4 gap-x-2 gap-y-1 items-center roboto-regular opacity-80 text-xs md:text-base">
              {trending.map((item: any, i: number) => (
                <li key={i}>
                  <Link href={`/arts-and-entertainment${item.link}`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-7 gap-3 mt-2.5">
          <div className="relative">
            <Link href={"/details/" + data[0]?.slug}>
              <img
                className="w-full md:h-[375px] h-[200px] object-cover rounded-[7.07px]"
                width={665}
                height={375}
                src={getImageUrl(data[0].thumbnail)}
                alt="image"
              />
            </Link>

            <div
              onClick={() => handleShare(data[0])}
              className="bg-black bg-opacity-10 cursor-pointer absolute backdrop-blur-sm w-[30.71px] h-[30.71px] flex items-center justify-center rounded-sm top-3 right-5"
            >
              <IoShareSocial className="w-[22.63px] h-[22.63px] text-white" />
            </div>
          </div>

          <div className="flex flex-col justify-center md:gap-6 gap-3">
            <Link href={"/details/" + data[0]?.slug}>
              <h2 className="lora-bold md:text-2xl text-lg leading-tight md:leading-normal">
                {data[0].title}
              </h2>
            </Link>
            <p className="text-xs opacity-80">{data[0].published_on}</p>

            {watchNow ? (
              <div>
                <Button
                  variant="secondary"
                  className="rounded-3xl flex items-center gap-2 text-[#065A68] font-bold mb-4 md:mb-0"
                >
                  Watch Video
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid md:grid-cols-4 grid-cols-2 md:mt-6 mt-3 md:gap-10 gap-4">
          {data?.slice(1, 5)?.map((item: any, i: number) => (
            <Link href={"/details/" + item?.slug} key={i}>
              <div>
                <img
                  src={getImageUrl(item.thumbnail)}
                  alt="image"
                  width={280}
                  height={145.8}
                  className="w-full  md:h-[145.8px] h-[100px] object-cover rounded-[7.07px]"
                />
              </div>

              <h4 className="mt-2.5 text-white text-xs roboto-regular opacity-80">
                {item.title}
              </h4>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-8">
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
    </section>
  );
};

export default Section3;

type PropsType = {
  data: any;
  heading: string;
  trending?: any;
  watchNow?: boolean;
  link?: string;
};
