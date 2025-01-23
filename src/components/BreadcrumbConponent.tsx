import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

export default function BreadcrumbComponent({ links }: { links: any }) {

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((item: any, i: number) => (
          <React.Fragment key={i}>
            <BreadcrumbItem>
              {i !== links.length - 1 ? (
                <Link href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <BreadcrumbPage >
                  {item.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>

            {i !== links.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
