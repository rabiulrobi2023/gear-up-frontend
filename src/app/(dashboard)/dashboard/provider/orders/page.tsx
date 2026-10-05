import { getMe } from "@/app/(auth)/_service/getMe";
import SelfOrderList from "@/app/(dashboard)/_components/shared/SelfOrderList";

import { Role } from "@/interface/auth.interface";

const IncomingOrderPage = async () => {
  const user = await getMe();
  return (
    <div>
      
      <SelfOrderList role={user?.data?.role as Role} />
    </div>
  );
};

export default IncomingOrderPage;
