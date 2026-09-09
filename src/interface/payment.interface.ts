export interface ICheckOut {
  success: boolean;
  message: string;
  data?: string | null;
}

export interface IPaymentResponse {
  success: boolean;
  message: string;
  data: IPayment[];
}

export interface IPayment {
  id: string;
  amount: string;
  status: string;
  method: string;

  order: {
    quantity: number;
    totalDays: number;

    customer: {
      name: string;
      email: string;
    };

    item: {
      name: string;
      dailyRate: string;
      category: {
        name: string;
      };
    };
  };
}
