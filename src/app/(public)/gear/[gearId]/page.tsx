import { IGear } from "@/interface/gear.interface";
import { getSingleGear } from "../../_actions/getSingleGear";
import GearDetails from "../../_components/gear/GearDetails";

const SingleGear = async ({
  params,
}: {
  params: Promise<{ gearId: string }>;
}) => {
  const { gearId } = await params;
  const gear = await getSingleGear(gearId);

  return (
    <div className="mt-4 max-w-lg mx-auto">
      <GearDetails gear={gear?.data as IGear} />
    </div>
  );
};

export default SingleGear;
