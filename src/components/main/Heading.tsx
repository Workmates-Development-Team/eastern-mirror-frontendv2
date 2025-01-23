import Image from "next/image";
import React from "react";

export default function Heading({ title }: PropsType) {
  return (
    <div className="container px-4 md:px-6 flex items-center justify-center md:mt-20 mt-12 md:mb-10 mb-6">
      <div className="flex-grow flex flex-col gap-1.5 md:gap-2 ">
        <div className="border-b-[0.7px] md:border-b border-[#a8a9aa] w-[97%]"></div>
        <div className="md:border-b-2 border-b border-dashed border-[#a8a9aa]"></div>
        <div className="border-b-[0.7px] md:border-b border-[#a8a9aa] w-[97%]"></div>
      </div>
      <div className="relative md:w-[280px] md:h-[30px] w-[200px] h-[25px] flex justify-center items-center">
        <Image
          className="absolute h-full w-full"
          width={280}
          height={30}
          src="/svg/heading_bg.svg"
          alt="heading-bg"
        />
        <span className="relative z-10 lora-medium md:text-xl text-base">
          {title}
        </span>
      </div>
      <div className="flex-grow flex flex-col gap-1.5 md:gap-2">
        <div className="border-b-[0.7px] md:border-b border-[#a8a9aa] w-[97%] ml-auto"></div>
        <div className="md:border-b-2 border-b border-dashed border-[#a8a9aa]"></div>
        <div className="border-b-[0.7px] md:border-b border-[#a8a9aa] w-[97%] ml-auto"></div>
      </div>
    </div>
  );
}

type PropsType = {
  title: string;
};
