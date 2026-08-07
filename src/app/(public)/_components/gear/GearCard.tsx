"use client";

import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {} from "@/interface";
import { IGear } from "@/interface/gear.interface";

interface GearCardProps {
  gear: IGear;
}

export function GearCard({ gear }: GearCardProps) {
  return (
    <Link href={`/gear/${gear.id}`}>
      <Card className=" mx-auto mt-2 w-full max-w-sm cursor-pointer overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex  min-h-max p-2">
        <Image
          unoptimized
          src={
            gear.image ||
            "https://praise.com.sg/wp-content/uploads/2024/08/gallery-33.png"
          }
          width={600}
          height={400}
          alt={gear.name}
          className="h-36 w-full object-contain"
        />

        <CardHeader>
          <CardTitle className="line-clamp-1">{gear.name}</CardTitle>
          <p className="text-sm text-muted-foreground">
            <span>Category: </span>
            {gear.category.name}
          </p>
        </CardHeader>

        <CardContent className="space-y-1 mt-auto">
          <p>
            <span className="font-medium">Brand:</span>
            {gear.brand}
          </p>
          <p>
            <span className="font-medium">Daily Rate:</span> BDT{" "}
            {gear.dailyRate} TK
          </p>

          <p>
            <span className="font-medium">Stock:</span> {gear.stock} pcs
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
