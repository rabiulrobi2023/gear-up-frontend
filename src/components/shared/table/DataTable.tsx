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

export function DataTable<T, K extends string = never>({
  data,
  columns,
  rowKey,
  showSerialNo = false,
  topAction,
  rowActions,
  isLoading = false,
  emptyMessage = "No data found.",
  tableBodyClassName,
  headerClassName,
  rowClassName,
}: IDataTableProps<T, K>) {
  const columnCount = columns.length + (rowActions ? 1 : 0);

  return (
    <div className="space-y-4">
      {topAction && <div className="flex justify-end">{topAction}</div>}

      <div
        className={cn("overflow-hidden rounded-md border", tableBodyClassName)}
      >
        <Table>
          <TableHeader>
            <TableRow
              className={cn(
                "bg-primary/10 hover:bg-primary/10",
                headerClassName,
              )}
            >
              {showSerialNo && (
                <TableHead className="text-center whitespace-nowrap w-0">
                  SL No.
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead
                  key={String(column.key)}
                  className={column.className}
                >
                  {column.header}
                </TableHead>
              ))}

              {rowActions && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columnCount} className="h-24 text-center ">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columnCount} className="h-12 text-center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow
                  key={String(row[rowKey])}
                  className={cn("hover:bg-primary/5", rowClassName)}
                >
                  {showSerialNo && (
                    <TableCell className="text-center whitespace-nowrap w-0 px-2">
                      {index + 1}
                    </TableCell>
                  )}

                  {columns.map((column) => {
                    const key = column.key;

                    return (
                      <TableCell key={String(key)} className={column.className}>
                        {column.accessor
                          ? column.accessor(row)
                          : column.format
                            ? column.format(row[key as keyof T], row)
                            : String(row[key as keyof T] ?? "-")}
                      </TableCell>
                    );
                  })}

                  {rowActions && <TableCell>{rowActions(row)}</TableCell>}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
