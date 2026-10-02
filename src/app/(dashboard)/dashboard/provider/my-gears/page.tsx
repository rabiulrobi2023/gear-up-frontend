import ProviderGearsTable from "@/app/(dashboard)/_components/provider/ProviderGearsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const ProviderGearPage = () => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">Gears</p>
        <Link href="/dashboard/provider/add-gear">
          <Button>
            <Plus className="font-bold" /> Add
          </Button>
        </Link>
      </div>

      <ProviderGearsTable />
    </div>
  );
};

export default ProviderGearPage;
