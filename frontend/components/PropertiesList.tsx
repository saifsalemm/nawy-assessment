"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { PropertiesListProps } from "@/types/unit";
import { usePathname, useSearchParams } from "next/navigation";
import UnitCard from "./UnitCard";

export default function PropertiesList({
  units,
  currentPage,
  totalPages,
}: PropertiesListProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex flex-col gap-6 mb-8">
        {units.length > 0 ? (
          units.map((unit) => <UnitCard key={unit._id} unit={unit} />)
        ) : (
          <div className="text-center py-4">No properties found</div>
        )}
      </div>

      <div className="mt-auto py-6 flex justify-center border-t border-gray-100 max-w-full">
        <Pagination>
          <PaginationContent className="flex gap-2 flex-wrap">
            <PaginationItem>
              <PaginationPrevious
                href={createPageURL(currentPage - 1)}
                className={
                  currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href={createPageURL(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={createPageURL(currentPage + 1)}
                className={cn(
                  "",
                  currentPage >= totalPages && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
