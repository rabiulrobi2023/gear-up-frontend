
import { getAllGears } from "../_actions/getAllGears";
import GearList from "../_components/gear/GearList";

import { getAllCategories } from "../_actions/getAllCategories";
import { GearFilterNavbar } from "../_components/shared/GearFilteringNavbar";


const LandingPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const query = await searchParams;
  const categories = await getAllCategories()

  const gears = await getAllGears({ query });
  return (
    <div className="mx-auto ">
      <div className=" mx-auto px-2 md:px-0">
        <h1 className="pt-2 text-xl font-bold">Gears</h1>
        {/* <GearFilterNavbar /> */}
        <GearList gears={gears} />
      </div>
    </div>
  );
};

export default LandingPage;
