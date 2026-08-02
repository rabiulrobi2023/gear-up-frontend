export interface IMetaData {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IQueryParams {
  query?: Record<string, string | string[] | undefined>;
}
