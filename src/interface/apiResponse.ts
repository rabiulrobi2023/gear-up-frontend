export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  metadata?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}
