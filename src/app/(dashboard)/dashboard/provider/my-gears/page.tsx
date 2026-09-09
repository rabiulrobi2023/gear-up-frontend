import { getSelfGears } from "@/app/(dashboard)/_service/getSelfGears";
import GearList from "@/components/shared/gear/GearList";

const MyGearPage = async () => {
  const gears = await getSelfGears();
  console.log(gears);
  return (
    <div className=" px-2 md:px-0">
      <h1 className="pt-2 text-xl font-bold">My Gears</h1>
      <GearList gears={gears} />
    </div>
  );
};

export default MyGearPage;
