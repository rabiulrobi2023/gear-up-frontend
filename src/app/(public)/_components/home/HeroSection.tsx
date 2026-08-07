"use client";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const images = [
  "https://cdn.outsideonline.com/wp-content/uploads/2022/07/OBJ-50-2022-1.jpg",
  "https://prommer.net/img/og/best-fan-indoor-cycling.jpg",
  "https://cdn.mos.cms.futurecdn.net/AK7kBT73mwyvu4M5rG5hTC.jpg",
];

export default function HeroSection() {
  return (
    <Carousel
      className="w-full mx-auto mt-0 rounded-0"
      plugins={[
        Autoplay({
          delay: 6000,
        }),
      ]}
      opts={{
        loop: true,
        align: "center",
        dragFree: false,
        containScroll: "trimSnaps",
        duration: 50,
        skipSnaps: false,
        watchDrag: true,
        watchResize: true,
        watchSlides: true,
        startIndex: 0,
      }}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative h-[300px] lg:h-[500px] w-full">
              <Image
                unoptimized
                src={image}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/10" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className=" md:flex ml-12 bg-transparent text-white" />
      <CarouselNext className=" md:flex mr-12 bg-transparent text-white" />
    </Carousel>
  );
}
