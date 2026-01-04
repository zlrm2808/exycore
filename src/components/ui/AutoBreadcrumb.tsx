"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export function AutoBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((item) => item !== "");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="text-[12px] text-[#605e5c]">Inicio</BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          // Capitalizamos la primera letra (ej: inventory -> Inventario)
          const label = segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator className="text-[#8a8886]" />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-[12px] font-medium text-[#323130]">{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href} className="text-[12px] text-[#605e5c]">{label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}