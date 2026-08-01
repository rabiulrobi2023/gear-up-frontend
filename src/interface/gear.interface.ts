export interface IProvider {
  name: string;
  email: string;
  phone: string;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IGear {
  id: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  providerId: string;
  categoryId: string;
  dailyRate: string;
  stock: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  category: ICategory;
  provider: IProvider;
}
