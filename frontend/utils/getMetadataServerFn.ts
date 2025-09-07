import { API_URL } from "@/lib/api";
import { Metadata } from "@/types/unit";

export async function getMetadata(): Promise<Metadata> {
  try {
    const response = await fetch(API_URL + "/metadata", {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch metadata");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      projects: [],
      developers: [],
      areas: [],
    };
  }
}
