"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function ImageGallery({ images }: { images: string[] }) {
  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 1,
        }}
        plugins={[Autoplay({ delay: 3000 })]}
      >
        <CarouselContent>
          {images.map((image: string, index: number) => (
            <CarouselItem key={index} className="basis-1/1 md:basis-1/2">
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <Image
                  src={image}
                  alt={`Unit image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}
