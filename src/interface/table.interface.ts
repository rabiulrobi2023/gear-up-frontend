import { ReactNode } from "react";

export interface IDataTableColumn<T, K extends string = never> {
  key: keyof T | K;
  header: string;
  className?: string;
  accessor?: (row: T) => ReactNode;
  format?: (value: unknown, row: T) => ReactNode;
}

export interface IDataTableProps<T, K extends string = never> {
  columns: IDataTableColumn<T, K>[];
  data: T[];
  rowKey: keyof T;
  showSerialNo?: boolean;
  topAction?: ReactNode;
  rowActions?: (row: T) => ReactNode;
  isLoading?: boolean;
  emptyMessage?: string;
  tableBodyClassName?: string;
  headerClassName?: string;
  rowClassName?: string;
}
