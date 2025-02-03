'use client'

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { getImageUrl } from "@/utils/getImageUrl";
import Link from "next/link";



interface Ads {
  _id: string;
  link: string;
  imageUrl: string;
}

interface Response {
  items: Ads[];
}

export function AdSlider() {
  const getAds = async (): Promise<Response> => {
    const { data } = await axiosInstance.get(
      `/ads/slider`
    );
    return data;
  };

  const {
    data = {

      items: [],
    },
  } = useQuery<Response>({
    queryKey: ["slider",],
    queryFn: () => getAds(),
    staleTime: 300000,
  });
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      className="w-full max-w-xs relative"
    >
      <CarouselContent>
        {data.items.map((item, index) => (
          <CarouselItem key={index}>
            <Link href={item.link} target="_blank" className="">
              <Image
                className="w-full h-[450px] object-cover"
                width={293}
                height={450}
                src={getImageUrl(item?.imageUrl)}
                alt="image"
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2" />
      <CarouselNext className="absolute right-2" />
    </Carousel>
  );
}
