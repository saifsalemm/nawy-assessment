import { Unit } from "@/types/unit";
import { formatPrice } from "@/utils/formatPrice";
import { Bath, BedDouble, Building2, CircleDollarSign, MapPin, Maximize2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const UnitCard = ({ unit }: { unit: Unit }) => {
  return (
    <div
      key={unit._id}
      className="bg-white rounded-xl shadow overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col md:flex-row"
    >
      <div className="relative md:w-1/3 md:h-auto h-64 flex-shrink-0 w-full">
        <Image
          src={unit.images[0]}
          alt={unit.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
        />
        <div className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow-md">
          <Image
            src={unit.developer_img_url}
            alt={unit.developer_name}
            width={50}
            height={25}
            className="object-contain"
          />
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            {unit.name}
          </h3>
          <div className="flex items-center gap-6">
            <p className="text-gray-600 flex items-center gap-2">
              <MapPin className="size-6" />
              {unit.area_name}
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <Building2 className="size-6" />
              {unit.project_name}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:gap-x-8 gap-y-4 mb-6">
          <div className="flex items-center gap-3">
            <BedDouble className="size-6" />
            <div>
              <p className="text-sm font-medium text-gray-500">Bedrooms</p>
              <p className="text-base font-semibold">{unit.bedrooms}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CircleDollarSign className="min-w-6 min-h-6" />
            <div>
              <p className="text-sm font-medium text-gray-500">Price</p>
              <p className="text-base font-semibold">
                {formatPrice(unit.price)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Bath className="size-6" />
            <div>
              <p className="text-sm font-medium text-gray-500">Bathrooms</p>
              <p className="text-base font-semibold">{unit.bathrooms}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Maximize2 className="size-6" />
            <div>
              <p className="text-sm font-medium text-gray-500">Area</p>
              <p className="text-base font-semibold">{unit.unit_area} m²</p>
            </div>
          </div>
        </div>

        <Link
          href={`/${unit._id}`}
          className="w-full md:w-auto px-8 bg-(--primary-color) text-white py-2.5 rounded-lg hover:bg-(--primary-color)/90 transition font-semibold"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default UnitCard;
