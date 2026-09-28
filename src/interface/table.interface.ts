import { HTMLProps, ReactNode } from "react";

export interface IDataTableColumn<T> {
  key: keyof T | (string & {});
  header: string;
  className?: React.ComponentProps<"div">["className"];
  accessor?: (row: T) => ReactNode | string;
  format?: (value: unknown, row: T) => ReactNode;
}

export interface IDataTableProps<T> {
  columns: IDataTableColumn<T>[];
  data: T[];
  rowKey: keyof T;
  topAction?: ReactNode;
  rowAction?: (row: T) => ReactNode;
  isLoading?: boolean;
  emptyMessage?: string;
  tableBodyClassName?: string
  headerClassName?: string;
  rowClassName?: string;
}
