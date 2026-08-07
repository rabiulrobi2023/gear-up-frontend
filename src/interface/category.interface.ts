export interface ICategoryResponse {
  success: boolean;
  message: string;
  data: ICategory[];
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  categoryPhoto: string;
  createdAt: string;
  updatedAt: string;
}
