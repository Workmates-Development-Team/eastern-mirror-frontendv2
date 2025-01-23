import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { IoShareSocial } from "react-icons/io5";

const Section1Skeleton = () => (
  <div>
    <section>
      <div className="container md:mt-20 mt-12 py-2 px-4 md:px-6 grid md:grid-cols-2 grid-cols-1 md:gap-7 gap-4">
        <div>
          <div className="relative">
            <div className="bg-black bg-opacity-10 cursor-pointer absolute backdrop-blur-sm w-[30.71px] h-[30.71px] flex items-center justify-center rounded-sm top-3 right-5">
              <IoShareSocial className="w-[22.63px] h-[22.63px] text-white" />
            </div>

            <div>
              <Skeleton className="w-full md:h-[420px] h-[220px]" />
            </div>

            <div className="-mt-12 relative w-[95%] mx-auto">
              <div className="bg-white md:px-[22px] px-3.5 py-2.5 shadow-md">
                <div className="flex items-center justify-between uppercase md:text-xs text-[10px] mb-3">
                  <div>
                    <Skeleton className="md:w-[200px] w-[150px] h-5" />
                  </div>

                  <div>
                    <Skeleton className="md:w-[150px] w-[100px] h-5" />
                  </div>
                </div>
                <div>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-1/2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:gap-5 gap-3">
          {Array.from({ length: 3 }).map((_, i: number) => (
            <div
              key={i}
              className={cn(
                " border-[#DDDDDD] md:pb-4 pb-3 grid grid-cols-6 md:gap-7 gap-2 h-[94%] max-h-[117px]"
              )}
            >
              <div className="col-span-4 flex flex-col justify-center">
                <div>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-1/2 mb-5" />
                </div>

                <Skeleton className="h-5 w-[100px]" />
              </div>

              <div className="col-span-2">
                <div className="h-full">
                  <Skeleton className="w-full h-full rounded-xl" />
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center">
            <Skeleton
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "bg-[#D4E2FF] text-[#244B9C] w-[100px] md:h-10 h-9 text-xs md:text-sm font-medium rounded-3xl hover:bg-[#D4E2FF] hover:text-[#244B9C] "
              )}
            />
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Section1Skeleton;
