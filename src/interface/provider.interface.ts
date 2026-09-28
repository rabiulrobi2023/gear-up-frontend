export interface IProviderStatisticsResponse {
  success: boolean;
  message: string;
  data: IProviderStatistics;
}

export interface IProviderStatistics {
  totalGears: number;
  activeGears: number;
  pendingGears: number;
}
