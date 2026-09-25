import { getSelfGears } from "@/app/(dashboard)/_service/getSelfGears";
import GearList from "@/components/shared/gear/GearList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MyGearPage = async () => {
  const gears = await getSelfGears();
  console.log(gears);
  return (
    <div className=" px-2 md:px-0">
      <div  className="flex justify-between mb-5">
        <h1 className="pt-2 text-xl font-bold">My Gears</h1>
       <Link href={"/dashboard/provider/add-gear"}> <Button>Add Gear</Button></Link>
      </div>
      <GearList gears={gears} />
    </div>
  );
};

export default MyGearPage;
