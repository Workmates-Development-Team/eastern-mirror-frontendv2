import { cn } from "@/lib/utils";
import React from "react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

const NotFoundComponent = () => {
  return (
    <section className="bg-white flex justify-center item">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
            Not Found
          </p>
          <p className="mb-4 text-lg font-light text-gray-500">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page
          </p>
          <Link href="/" className={cn(buttonVariants(), 'bg-[#002366] hover:bg-[#002466e8]')}>
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundComponent;
