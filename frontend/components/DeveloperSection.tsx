import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/formatPrice";
import { Mail } from "lucide-react";
import Image from "next/image";

interface DeveloperSectionProps {
  developerName: string;
  developerImage: string;
  price: number;
}

export default function DeveloperSection({
  developerName,
  developerImage,
  price,
}: DeveloperSectionProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-white p-8 rounded-2xl shadow-lg">
      <div className="flex items-center gap-6">
        <div className="relative h-20 w-20">
          <Image
            src={developerImage}
            alt={developerName}
            fill
            className="object-contain"
          />
        </div>
        <div>
          <p className="text-sm text-gray-600">Developer</p>
          <p className="text-xl font-bold">{developerName}</p>
        </div>
      </div>

      <div className="flex flex-col items-center lg:items-end gap-4">
        <div className="text-center md:text-right">
          <p className="text-sm text-gray-600">Starting from</p>
          <p className="text-2xl font-bold text-primary">
            {formatPrice(price)} EGP
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-(--primary-color)" size="lg">
            <Mail className="mr-2 h-4 w-4" />
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}
