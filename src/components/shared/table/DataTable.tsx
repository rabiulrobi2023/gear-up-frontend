import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IDataTableProps } from "@/interface/table.interface";
import { cn } from "@/lib/utils";

export function DataTable<T>({
  data,

  columns,
  rowKey,
  topAction,
  rowAction,
  isLoading = false,
  emptyMessage = "No data found.",
  tableBodyClassName,
  headerClassName,
  rowClassName,
}: IDataTableProps<T>) {
  const columnCount = columns.length + (rowAction ? 1 : 0);

  return (
    <div className="space-y-4">
      {topAction && <div className="flex justify-end">{topAction}</div>}

      <div
        className={cn(
          "rounded-md border-1 overflow-hidden",
          tableBodyClassName,
        )}
      >
        <Table>
          <TableHeader className="bg-none hover:bg-none">
            <TableRow
              className={cn("hover:bg-gray-100 bg-gray-100", headerClassName)}
            >
              {columns.map((column) => (
                <TableHead
                  key={column.key as string}
                  className={column.className}
                >
                  {column.header}
                </TableHead>
              ))}

              {rowAction && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>

          <TableBody className="">
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columnCount} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columnCount} className="h-12 text-center ">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow
                  className={cn("hover:bg-primary/5 ", rowClassName)}
                  key={String(row[rowKey as keyof T])}
                >
                  {columns.map((column) => {
                    if (column.accessor) {
                      return (
                        <TableCell
                          key={column.key as string}
                          className={column.className as string}
                        >
                          {column.accessor(row)}
                        </TableCell>
                      );
                    }

                    const value = row[column.key as keyof T];

                    return (
                      <TableCell
                        key={column.key as string}
                        className={column.className}
                      >
                        {column.format
                          ? column.format(value, row)
                          : String(value ?? "-")}
                      </TableCell>
                    );
                  })}

                  {rowAction && <TableCell>{rowAction(row)}</TableCell>}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
