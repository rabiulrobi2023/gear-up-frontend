"use client";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

import { ITableProps } from "@/interface/table.interface";

const DataTable = <T,>({
  data,
  columns,
  emptyMessage = "No data found",
  topAction,
  rowAction,
}: ITableProps<T>) => {
  return (
    <div>
      <div>
        {topAction && <div className="flex justify-end">{topAction}</div>}
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(column.className, "text-white")}
                >
                  {column.header}
                </TableHead>
              ))}

              {rowAction && <TableHead>Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="hover:bg-light">
                  {columns?.map((column) => (
                    <TableCell key={column.key} className={column.className}>
                      {String(row[column?.key as keyof T]) ?? "-"}
                    </TableCell>
                  ))}

                  {rowAction && <TableCell>{rowAction}</TableCell>}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
