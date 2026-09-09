"use client";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export interface ITableColumn {
  key: string;
  header: string;
  className?: string;
}

export interface ITableProps<T> {
  data: T[];
  columns: ITableColumn[];
  emptyMessage?: string;
}
const TableStructure = <T,>({
  data,
  columns,
  emptyMessage = "No data found",
}: ITableProps<T>) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow  className="bg-primary hover:bg-primary">
            {columns.map((column) => (
              <TableHead key={column.key} className={cn(column.className, "text-white")}>{column.header}</TableHead>
            ))}
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
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableStructure;
