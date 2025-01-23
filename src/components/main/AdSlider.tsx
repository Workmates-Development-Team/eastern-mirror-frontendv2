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

const ads = [
  {
    thumbnail: "/images/ads/nathu.webp",
  },
  {
    thumbnail: "/images/ads/nathu-2.webp",
  },
  {
    thumbnail: "/images/ads/nathu-3.webp",
  },
];

export function AdSlider() {
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
        {ads.map((item, index) => (
          <CarouselItem key={index}>
            <div className="">
              <Image
                className="w-full h-[530px] object-cover"
                width={293}
                height={530}
                src={item?.thumbnail}
                alt="image"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2" />
      <CarouselNext className="absolute right-2" />
    </Carousel>
  );
}
