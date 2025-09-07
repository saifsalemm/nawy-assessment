"use client";

import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/api";
import { CreateUnitI, Metadata } from "@/types/unit";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

const initialFormData: CreateUnitI = {
  name: "",
  description: "",
  unit_area: 0,
  area_id: "",
  area_name: "",
  bedrooms: 0,
  bathrooms: 0,
  project_id: "",
  project_name: "",
  developer_id: "",
  developer_name: "",
  developer_img_url: "",
  price: 0,
  images: [],
  coordinates: [31.485892635931947, 30.86732794087174],
  payment_plans: [
    {
      down_payment: 20,
      installments: 60,
      installment_amount: 25000,
    },
  ],
};

export default function AddUnit({ metadata }: { metadata: Metadata }) {
  const router = useRouter();
  const [unitData, setUnitData] = useState<CreateUnitI>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const downPaymentRef = useRef<HTMLInputElement | null>(null);
  const installmentsRef = useRef<HTMLInputElement | null>(null);
  const installmentAmountRef = useRef<HTMLInputElement | null>(null);

  const areas = metadata.areas;
  const projects = metadata.projects;
  const developers = metadata.developers;

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUploading(true);
    const formData = new FormData();
    formData.append("file", e.target.files![0]);

    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.path) {
        setUnitData((prev) => ({
          ...prev,
          images: [...prev.images, `${API_URL}/${data.path}`],
        }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:4000/units`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...unitData,
            unit_area: Number(unitData.unit_area),
            bedrooms: Number(unitData.bedrooms),
            bathrooms: Number(unitData.bathrooms),
            price: Number(unitData.price),
            area_name:
              areas.find((a) => a._id === unitData.area_id)?.name || "",
            project_name:
              projects.find((p) => p._id === unitData.project_id)?.name || "",
            developer_name:
              developers.find((d) => d._id === unitData.developer_id)?.name ||
              "",
            developer_img_url:
              developers.find((d) => d._id === unitData.developer_id)
                ?.image_url || "",
          }),
        });

        if (response.ok) {
          const createdUnit = await response.json();
          router.push("/" + createdUnit._id);
        } else {
          throw new Error("Failed to list your property.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to list your property.");
      } finally {
        setLoading(false);
      }
    },
    [unitData, areas, developers, projects, router]
  );

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUnitData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPaymentPlan = () => {
    const down_payment = downPaymentRef.current?.value;
    const installments = installmentsRef.current?.value;
    const installment_amount = installmentAmountRef.current?.value;

    if (!down_payment || !installments || !installment_amount) {
      alert("Please fill all payment plan fields");
      return;
    }

    setUnitData((prev) => ({
      ...prev,
      payment_plans: [
        ...prev.payment_plans,
        {
          down_payment: Number(down_payment),
          installments: Number(installments),
          installment_amount: Number(installment_amount),
        },
      ],
    }));

    if (downPaymentRef.current) downPaymentRef.current.value = "";
    if (installmentsRef.current) installmentsRef.current.value = "";
    if (installmentAmountRef.current) installmentAmountRef.current.value = "";
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">List Your Property</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={unitData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50 bg-white"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Unit Area (m²)</label>
            <input
              type="number"
              name="unit_area"
              value={unitData.unit_area}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50 bg-white"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={unitData.bedrooms}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50 bg-white"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              value={unitData.bathrooms}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50 bg-white"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={unitData.price}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50 bg-white"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Select Area</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50 bg-white"
              value={unitData.area_id}
              onChange={handleInputChange}
              name="area_id"
            >
              <option value="" disabled></option>
              {areas.map((area) => (
                <option key={area._id} value={area._id}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Select Developer</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50 bg-white"
              value={unitData.developer_id}
              onChange={handleInputChange}
              name="developer_id"
            >
              <option value="" disabled></option>
              {developers.map((developer) => (
                <option key={developer._id} value={developer._id}>
                  {developer.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Select Project</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50 bg-white"
              value={unitData.project_id}
              onChange={handleInputChange}
              name="project_id"
            >
              <option value="" disabled></option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={unitData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50 bg-white"
              rows={4}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2">Add Payment Plan:</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2">Down Payment</label>
                <input
                  ref={downPaymentRef}
                  type="text"
                  name="down_payment"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50 bg-white"
                />
              </div>
              <div>
                <label className="block mb-2">Installments</label>
                <input
                  ref={installmentsRef}
                  type="text"
                  name="installments"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50 bg-white"
                />
              </div>
              <div>
                <label className="block mb-2">Installment Amount</label>
                <input
                  ref={installmentAmountRef}
                  type="text"
                  name="installment_amount"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50 bg-white"
                />
              </div>
            </div>
            <Button
              type="button"
              onClick={addPaymentPlan}
              className="mt-4 bg-(--secondary-color) hover:bg-(--secondary-color) hover:cursor-pointer text-white font-bold py-2 px-4 rounded-lg"
            >
              Add Plan
            </Button>
          </div>

          <div className="md:col-span-2">
            {unitData.payment_plans.map((plan, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded-lg mb-2 bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p>
                      <strong>Down Payment:</strong> {plan.down_payment}%
                    </p>
                    <p>
                      <strong>Installments:</strong> {plan.installments} months
                    </p>
                    <p>
                      <strong>Installment Amount:</strong>{" "}
                      {plan.installment_amount} EGP
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={() =>
                      setUnitData((prev) => ({
                        ...prev,
                        payment_plans: prev.payment_plans.filter(
                          (_, i) => i !== index
                        ),
                      }))
                    }
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2">Upload Images</label>
            <Button
              variant="link"
              type="button"
              className="hover:no-underline w-full text-center h-40 hover:cursor-pointer border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500"
              onClick={() => document.getElementById("image-upload")?.click()}
              disabled={imageUploading}
            >
              {imageUploading ? "Uploading image..." : "Click to upload images"}
            </Button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={uploadImage}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50 bg-white"
              hidden
            />
          </div>

          {unitData.images.length > 0 && (
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
              {unitData.images.map((url, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-lg overflow-hidden"
                >
                  <Button
                    type="button"
                    onClick={() =>
                      setUnitData((prev) => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index),
                      }))
                    }
                    className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center w-fit"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                  <Image
                    src={url}
                    alt={"Preview " + (index + 1)}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-(--primary-color) text-white py-2 px-4 rounded-lg hover:bg-(--primary-color)/90 disabled:bg-(--primary-color)/50"
        >
          {loading ? "Creating..." : "Create Unit"}
        </Button>
      </form>
    </div>
  );
}
