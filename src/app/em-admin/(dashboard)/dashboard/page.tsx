'use client'

import AreaChartComponent from "@/components/AreaChart";
import { useAuthContext } from "@/context/AuthContext";
import { STATS } from "@/static/data";
import { Calendar, ChevronDown, View } from "lucide-react";

export default function Dashboard() {
  const {user} = useAuthContext()

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-[#f3f2f7ab]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl text-[#464255]">
            Dashboard
          </h1>
          <p className="text-[#A3A3A3] capitalize">Hi, {user.firstName}. Welcome back to EM Admin!</p>
        </div>

        <div>
          <div className="bg-white flex cursor-pointer items-center px-6 gap-4 py-3.5 shadow-sm rounded-[12px]">
            <div className="rounded-[15px] bg-[#2D9CDB] p-2.5 bg-opacity-25">
              <Calendar className="w-6 h-6 text-[#2D9CDB]" />
            </div>

            <div>
              <h3 className="text-[#3E4954] text-lg font-medium">
                Filter Periode
              </h3>
              <p className="text-xs text-[#3E4954]">
                17 April 2024 - 21 May 2024
              </p>
            </div>

            <div>
              <ChevronDown className="text-[#B9BBBD] w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className="grid grid-cols-3 gap-6">
          {STATS.map((item, i) => (
            <div
              className="bg-white p-5 justify-center rounded-[14px] flex items-center gap-6"
              key={i}
            >
              <div>
                <div className="bg-[#2D9CDB] bg-opacity-25 w-16 h-16 flex justify-center items-center rounded-full">
                  {item.icon()}
                </div>
              </div>
              <div>
                <h1 className="text-[#464255] text-[36px] font-bold leading-[36px]">
                  {item.value}
                </h1>
                <h3 className="text-[#464255] text-sm">{item.label}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-5 mt-5">
          <AreaChartComponent />
        </div>
      </div>
    </main>
  );
}
