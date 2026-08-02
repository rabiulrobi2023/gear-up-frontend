import { getAllGears } from "../_actions/getAllGears";
import GearList from "../_components/gear/GearList";

const LandingPage = async () => {
    const gears = await getAllGears()
  return (
    <div className="mx-auto ">

      <div className="container mx-auto px-2 md:px-0">
        <h1 className="pt-6 text-xl font-bold">Gears</h1>
        <GearList gears={gears} />
      </div>
    </div>
  );
};

export default LandingPage;
