import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { IoShareSocial } from "react-icons/io5";

const Section1SkeletonImproved = () => (
  <div>
    <section>
      <div className="container md:mt-20 mt-12 py-2 px-4 md:px-6 grid md:grid-cols-2 grid-cols-1 md:gap-7 gap-4">
        {/* Main card skeleton with fixed aspect ratio */}
        <div>
          <div className="relative">
            <div className="bg-black bg-opacity-10 cursor-pointer absolute backdrop-blur-sm w-[30.71px] h-[30.71px] flex items-center justify-center rounded-sm top-3 right-5 z-10">
              <IoShareSocial className="w-[22.63px] h-[22.63px] text-white" />
            </div>

            <div className="w-full relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <Skeleton className="w-full h-full" />
            </div>

            {/* Content overlay skeleton */}
            <div className="relative -mt-12 w-[95%] mx-auto">
              <div className="bg-white md:px-[22px] px-3.5 py-2.5 shadow-md min-h-[80px]">
                <div className="flex items-center justify-between uppercase md:text-xs text-[10px] mb-3">
                  <div className="flex-1">
                    <Skeleton className="md:w-[120px] w-[100px] h-3" />
                  </div>
                  <div className="flex-1 flex justify-end">
                    <Skeleton className="md:w-[80px] w-[60px] h-3" />
                  </div>
                </div>
                <div className="min-h-[2.5rem]">
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-5 w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side cards skeleton */}
        <div className="flex flex-col md:gap-5 gap-3">
          {Array.from({ length: 3 }).map((_, i: number) => (
            <div
              key={i}
              className="border-b border-[#DDDDDD] md:pb-4 pb-3 grid grid-cols-6 md:gap-7 gap-2 min-h-[117px]"
            >
              <div className="col-span-4 flex flex-col justify-center">
                <div className="mb-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-4/5 mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <Skeleton className="h-3 w-[100px]" />
              </div>

              <div className="col-span-2">
                <div className="w-full h-full min-h-[80px]">
                  <Skeleton className="w-full h-full rounded-lg" />
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-4">
            <Skeleton className="w-[120px] h-9 rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Section1SkeletonImproved;
