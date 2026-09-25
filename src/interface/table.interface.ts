export interface ITableColumn {
  key: string;
  header: string;
  className?: string;
}

export interface ITableProps<T> {
  data: T[];
  columns: ITableColumn[];
  emptyMessage?: string;
  topAction?: React.ReactNode;
  rowAction?: React.ReactNode;
}
