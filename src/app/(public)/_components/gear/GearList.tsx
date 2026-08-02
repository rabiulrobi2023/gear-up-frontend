"use server";

import { IGearResponse } from "@/interface/gear.interface";
import { GearCard } from "./GearCard";

const GearList = async ({ gears }: { gears: IGearResponse }) => {
  console.log(gears);
  if (!gears) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        No Gear found.
      </div>
    );
  }

  return (
    <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5  ">
      {gears?.data?.data?.map((gear) => (
        <GearCard key={gear?.id} gear={gear} />
      ))}
    </div>
  );
};

export default GearList;
