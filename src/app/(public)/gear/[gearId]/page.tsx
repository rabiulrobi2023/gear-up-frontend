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
    <div>
      <GearDetails gear={gear.data.data as IGear} />
    </div>
  );
};

export default SingleGear;
