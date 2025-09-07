import { Bath, BedDouble, Home, Maximize2 } from "lucide-react";

interface UnitDetailsProps {
  unit: {
    price: number;
    unit_area: number;
    bedrooms: number;
    bathrooms: number;
    area_name: string;
  };
}

export default function UnitDetails({ unit }: UnitDetailsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-8 rounded-2xl shadow-lg">
      <div className="flex items-center gap-3">
        <span className="p-3 bg-primary/10 rounded-xl">
          <Home className="h-6 w-6 text-primary" />
        </span>
        <div>
          <p className="text-sm text-gray-600">Area</p>
          <p className="font-semibold">{unit.area_name}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="p-3 bg-primary/10 rounded-xl">
          <Maximize2 className="h-6 w-6 text-primary" />
        </span>
        <div>
          <p className="text-sm text-gray-600">Unit Area</p>
          <p className="font-semibold">{unit.unit_area} m²</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="p-3 bg-primary/10 rounded-xl">
          <BedDouble className="h-6 w-6 text-primary" />
        </span>
        <div>
          <p className="text-sm text-gray-600">Bedrooms</p>
          <p className="font-semibold">{unit.bedrooms}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="p-3 bg-primary/10 rounded-xl">
          <Bath className="h-6 w-6 text-primary" />
        </span>
        <div>
          <p className="text-sm text-gray-600">Bathrooms</p>
          <p className="font-semibold">{unit.bathrooms}</p>
        </div>
      </div>
    </div>
  );
}
