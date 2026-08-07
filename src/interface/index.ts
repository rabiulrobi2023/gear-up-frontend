export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  metadata?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}
