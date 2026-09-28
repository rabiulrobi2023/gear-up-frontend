import { DataTable } from "@/components/shared/table/DataTable";
import { IGear } from "@/interface/gear.interface";
import { IDataTableColumn, IDataTableProps } from "@/interface/table.interface";
import Image from "next/image";

export const providerTableColumn: IDataTableColumn<IGear>[] = [
  {
    key: "image",
    header: "Photo",
    format: (value, row) =>
      value ? (
        <Image
          src={value as string}
          alt="Gear"
          width={48}
          height={48}
          className="size-12 rounded-md object-cover"
        />
      ) : (
        <span>No photo</span>
      ),
  },
  {
    key: "name",
    header: "Name",
  },
  {
    key: "category",
    header: "Category",
  },
  {
    key: "brand",
    header: "Brand",
  },
  {
    key: "dailyRate",
    header: "Daily Rate",
  },
];

const ProviderGearsTable = <T,>({
  data,
  rowKey,
  rowAction,
  topAction,
}: IDataTableProps<T>) => {
  // return <DataTable columns={providerTableColumn} data={data} rowKey={rowKey} />;
};

export default ProviderGearsTable;
