import { getImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoShareSocial } from "react-icons/io5";

const StoryCard = ({ item }: { item: any }) => {
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/${item?.slug}`;
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
    <div className="relative">
      <div
        onClick={handleShare}
        className="bg-black z-10 bg-opacity-10 cursor-pointer absolute backdrop-blur-sm w-[30.71px] h-[30.71px] flex items-center justify-center rounded-sm top-3 right-5"
      >
        <IoShareSocial className="w-[22.63px] h-[22.63px] text-white" />
      </div>
      <Link href={"/" + item?.slug} className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-35"></Link>
      <div>
        <Image
          className={`w-full h-[354.99px] ${!item.thumbnail? 'object-contain' : 'object-cover'}`}
          src={getImageUrl(item.thumbnail)}
          width={330}
          height={354.99}
          alt={item.title}
        />
      </div>

      <div className="h-[70px] bottom-0 w-full absolute px-[22px] py-2 bg-[#00000045] text-[#FFFFFF] flex flex-col justify-between backdrop-blur-sm">
        <Link href={"/" + item?.slug}>
          <h3 className="roboto-regular">{item.title?.slice(0, 50)?.trim() + "..."}</h3>
        </Link>
      </div>
    </div>
  );
};

export default StoryCard;
