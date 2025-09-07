"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Separator } from "./ui/separator";

interface Project {
  _id: string;
  name: string;
}

interface Developer {
  _id: string;
  name: string;
  image_url: string;
}

interface Area {
  _id: string;
  name: string;
}

interface SidebarFiltersProps {
  projects: Project[];
  developers: Developer[];
  areas: Area[];
}

interface Filters {
  project_id: string;
  developer_id: string;
  area_id: string;
  bedrooms: string;
  bathrooms: string;
  "unit_area[gte]": string;
  "unit_area[lte]": string;
  "price[gte]": string;
  "price[lte]": string;
}

const defaultFilters: Filters = {
  project_id: "",
  developer_id: "",
  area_id: "",
  bedrooms: "",
  bathrooms: "",
  "unit_area[gte]": "",
  "unit_area[lte]": "",
  "price[gte]": "",
  "price[lte]": "",
};

const SidebarFilters = ({
  projects,
  developers,
  areas,
}: SidebarFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>(() => {
    const params = new URLSearchParams(searchParams.toString());
    return {
      project_id: params.get("project_id") || "",
      developer_id: params.get("developer_id") || "",
      area_id: params.get("area_id") || "",
      bedrooms: params.get("bedrooms") || "",
      bathrooms: params.get("bathrooms") || "",
      "unit_area[gte]": params.get("unit_area[gte]") || "",
      "unit_area[lte]": params.get("unit_area[lte]") || "",
      "price[gte]": params.get("price[gte]") || "",
      "price[lte]": params.get("price[lte]") || "",
    };
  });

  return (
    <div className="col-span-1 border border-gray-200 bg-white rounded-2xl p-6 flex flex-col h-fit gap-6 shadow">
      <h3 className="text-2xl font-bold text-primary mb-2">Filters</h3>
      <Separator />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Developer
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50 bg-white"
          value={filters.developer_id}
          onChange={(e) =>
            setFilters((f) => ({ ...f, developer_id: e.target.value }))
          }
        >
          <option value="">All Developers</option>
          {developers.map((developer) => (
            <option key={developer._id} value={developer._id}>
              {developer.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50 bg-white"
          value={filters.project_id}
          onChange={(e) =>
            setFilters((f) => ({ ...f, project_id: e.target.value }))
          }
        >
          <option value="">All Projects</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Area
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50 bg-white"
          value={filters.area_id}
          onChange={(e) =>
            setFilters((f) => ({ ...f, area_id: e.target.value }))
          }
        >
          <option value="">All Areas</option>
          {areas.map((area) => (
            <option key={area._id} value={area._id}>
              {area.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bedrooms
          </label>
          <input
            type="number"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50"
            placeholder="Any"
            value={filters.bedrooms}
            onChange={(e) =>
              setFilters((f) => ({ ...f, bedrooms: e.target.value }))
            }
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bathrooms
          </label>
          <input
            type="number"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50"
            placeholder="Any"
            value={filters.bathrooms}
            onChange={(e) =>
              setFilters((f) => ({ ...f, bathrooms: e.target.value }))
            }
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Unit Area
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50"
            placeholder="Min"
            value={filters["unit_area[gte]"]}
            onChange={(e) =>
              setFilters((f) => ({ ...f, "unit_area[gte]": e.target.value }))
            }
          />
          <input
            type="number"
            min="0"
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50"
            placeholder="Max"
            value={filters["unit_area[lte]"]}
            onChange={(e) =>
              setFilters((f) => ({ ...f, "unit_area[lte]": e.target.value }))
            }
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50"
            placeholder="Min"
            value={filters["price[gte]"]}
            onChange={(e) =>
              setFilters((f) => ({ ...f, "price[gte]": e.target.value }))
            }
          />
          <input
            type="number"
            min="0"
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50"
            placeholder="Max"
            value={filters["price[lte]"]}
            onChange={(e) =>
              setFilters((f) => ({ ...f, "price[lte]": e.target.value }))
            }
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
          onClick={() => {
            setFilters(defaultFilters);
            router.push("/");
          }}
        >
          Reset
        </button>
        <button
          className="flex-1 py-2 rounded-lg bg-(--primary-color) text-white font-semibold hover:bg-(--primary-color)/90 transition shadow"
          onClick={() => {
            const params = new URLSearchParams();

            Object.entries(filters).forEach(([key, value]) => {
              if (value) {
                params.set(key, value.toString());
              }
            });

            params.set("page", "1");

            router.push(`/?${params.toString()}`);
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default SidebarFilters;
