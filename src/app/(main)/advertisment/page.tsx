"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Advertisment = () => {
  const [active, setActive] = useState(0);

  const handleLinkClick = (activeValue: number) => {
    setActive(activeValue);
  };

  return (
    <div className="container flex flex-col gap-8 md:flex-row justify-between px-4 md:px-6 mt-10">
      <div className="flex-1">
        <div className="flex gap-6">
          <Button
            variant={active === 0 ? "default" : "outline"}
            onClick={() => handleLinkClick(0)}
          >
            For Sales
          </Button>
          <Button
            variant={active === 1 ? "default" : "outline"}
            onClick={() => handleLinkClick(1)}
          >
            Others
          </Button>
        </div>

        <div>
          {active === 0 ? (
            <div>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-4 md:gap-7 gap-4">
                {Array.from({ length: 8 })?.map((item, i) => (
                  <div key={i}>
                    <Image
                      className="w-full"
                      src="/images/image.jpg"
                      alt="image"
                      width={300}
                      height={400}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-3">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          ) : active === 1 ? (
            <div>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 md:gap-7 gap-4">
              {Array.from({ length: 2 })?.map((item, i) => (
                <div key={i}>
                  <Image
                    className="w-full"
                    src="/images/image.jpg"
                    alt="image"
                    width={300}
                    height={400}
                  />
                </div>
              ))}
            </div>

            <div className="mt-3">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
          ) : null}
        </div>
      </div>

      <div className="md:w-[200px] w-full bg-gray-200 flex justify-center items-center h-[200px] md:h-screen">
        google ad
      </div>
    </div>
  );
};

export default Advertisment;
