import { getImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const Event = ({
  title,
  articles,
  slug,
}: {
  slug: string;
  title: string;
  articles: {
    thumbnail: string;
    category: string;
    title: string;
    author: string;
    date: string;
    slug: string;
  }[];
}) => {
  if (!title) return null;

  return (
    <section>
      <div className="container py-2 px-4 md:px-6 md:mt-16 mt-8">
        <div className="flex justify-between  mb-5 items-center">
          <h2 className="lora-bold md:text-3xl text-xl max-w-[60%]">{title}</h2>

          <div>
            <Link
              href={`/event/${slug}`}
              className="flex items-center md:gap-2 gap-1 uppercase text-sm md:text-base"
            >
              View More <FaArrowRightLong className="text-sm md:text-base" />
            </Link>
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-7 gap-5">
          {articles?.slice(0, 2).map((item, i) => (
            <div key={i}>
              <CardVertical data={item} />
            </div>
          ))}

          <div className="flex flex-col md:gap-4 gap-3">
            {articles?.slice(2, 5)?.map(
              (
                item: {
                  thumbnail: string;
                  title: string;
                  slug: string;
                },
                i
              ) => (
                <Link
                  href={`/details/${item?.slug}`}
                  key={i}
                  className="flex md:gap-4 gap-2.5"
                >
                  <div className="">
                    <div className="md:w-[120px] w-[110px]">
                      <img
                        className="w-full md:h-[117px] h-[100px] object-cover"
                        src={getImageUrl(item.thumbnail)}
                        width={120}
                        height={90}
                        alt="image"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <h2 className="text-[#080F18] lora-bold md:text-sm text-xs md:pb-2 pb-1.5">
                      {item.title}
                    </h2>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Event;

export const CardVertical = ({
  data,
}: {
  data: {
    slug: string;
    thumbnail: string;
    title: string;
  };
}) => (
  <Link href={`/details/${data?.slug}`}>
    <div>
      <img
        src={getImageUrl(data.thumbnail)}
        alt={data.title}
        className="w-full md:h-[250px] h-[225px] object-cover"
        width={397}
        height={250}
      />
    </div>

    <div>
      <h3 className="text-[#080F18] lora-bold md:text-lg text-base pb-1">
        {data.title}
      </h3>
    </div>
  </Link>
);
