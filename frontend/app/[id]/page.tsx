import DeveloperSection from "@/components/DeveloperSection";
import ImageGallery from "@/components/ImageGallery";
import PaymentPlans from "@/components/PaymentPlans";
import UnitDetails from "@/components/UnitDetails";
import { API_URL } from "@/lib/api";
import { notFound } from "next/navigation";

async function getUnit(id: string) {
  try {
    const response = await fetch(`${API_URL}/units/${id}`, {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch unit");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching unit:", error);
    return null;
  }
}

export default async function UnitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const unit = await getUnit(id);

  if (!unit) {
    notFound();
  }

  return (
    <main className="min-h-screen p-8 sm:p-20 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{unit.name}</h1>
          <h3 className="text-xl font-semibold text-gray-500">
            Project: {unit.project_name}
          </h3>
        </div>

        <ImageGallery images={unit.images} />

        <UnitDetails unit={unit} />

        <DeveloperSection
          developerName={unit.developer_name}
          developerImage={unit.developer_img_url}
          price={unit.price}
        />

        <div className="aspect-video w-full md:w-3/4 rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3453.2613740262614!2d31.588199080019645!3d30.058041553271128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDAzJzI4LjkiTiAzMcKwMzUnMzUuMSJF!5e0!3m2!1sen!2seg!4v1757192258078!5m2!1sen!2seg"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <PaymentPlans plans={unit.payment_plans} price={unit.price} />
      </div>
    </main>
  );
}
