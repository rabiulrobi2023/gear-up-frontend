"use client";
import { Button } from "@/components/ui/button";
import { defaultImage } from "@/constants";
import { IGear } from "@/interface/gear.interface";
import Image from "next/image";

const GearDetails = ({ gear }: { gear: IGear }) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:gap-10 space-y-3">
        <div className="flex flex-1 items-center">
          {" "}
          <Image
            unoptimized
            src={gear?.image || defaultImage}
            height={900}
            width={600}
            alt={gear.name}
            className="w-[300px]  h-[300px] object-center mx-auto md:mx-0"
          />
        </div>

        <div className="space-y-3 flex-3 mb-3">
          <div className="space-y-2">
            <h1 className="font-bold text-xl">{gear.name}</h1>
            <p>Category: {gear.category.name}</p>
            <p>Provider Name: {gear.provider.name}</p>
            <p>Available: {gear?.stock}</p>
            <p>Price: {gear.dailyRate}TK/day</p>
          </div>
          <Button>Rent Now</Button>
        </div>
      </div>
      <div>
        <p className="text-xl font-bold">Description:</p>
        <p>{gear.description}</p>
      </div>
    </div>
  );
};

export default GearDetails;
