import { CartItem } from '../../cart';

export type Order = {
  id?: string;
  userId: string;
  cartId: string;
  items: CartItem[];
  payment: {
    type: string;
    address?: unknown;
    creditCard?: unknown;
  };
  delivery: {
    type: string;
    address: unknown;
  };
  comments: string;
  status: string;
  total: number;
};
