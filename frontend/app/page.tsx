import PropertiesList from "@/components/PropertiesList";
import SearchBar from "@/components/SearchBar";
import SidebarFilters from "@/components/SidebarFilters";
import { API_URL } from "@/lib/api";
import { getMetadata } from "@/utils/getMetadataServerFn";
import { Suspense } from "react";

interface SearchParams {
  page?: string;
  unitName?: string;
  unitNumber?: string;
  project_id?: string;
  developer_id?: string;
  area_id?: string;
  bedrooms?: string;
  bathrooms?: string;
  "unit_area[gte]"?: string;
  "unit_area[lte]"?: string;
  "price[gte]"?: string;
  "price[lte]"?: string;
}

async function getUnits(searchParams: SearchParams) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  if (!params.has("page")) {
    params.append("page", "1");
  }

  try {
    const response = await fetch(`${API_URL}/units?${params.toString()}`, {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch units");
    }

    const { data, pages, currentPage } = await response.json();
    return {
      units: data,
      totalPages: pages,
      currentPage: currentPage,
    };
  } catch (error) {
    console.error("Error fetching units:", error);
    return {
      units: [],
      totalPages: 1,
      currentPage: 1,
    };
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filters = await searchParams;
  console.log("cafasfsdfsgada", filters, searchParams);
  const [unitsData, metadata] = await Promise.all([
    getUnits(filters),
    getMetadata(),
  ]);

  const { units, totalPages, currentPage } = unitsData;

  return (
    <main className="min-h-screen p-8 sm:p-20 space-y-8">
      <SearchBar />
      <div className="container mx-auto grid md:grid-cols-[30%_1fr] grid-cols-1 gap-8">
        <SidebarFilters
          projects={metadata.projects}
          developers={metadata.developers}
          areas={metadata.areas}
        />
        <Suspense fallback={<div>Loading...</div>}>
          <PropertiesList
            units={units}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </Suspense>
      </div>
    </main>
  );
}
