// TODO del them after

export type Product = {
  id: string;
  title?: string;
  description?: string;
  price?: number;
};

export type CartItem = {
  product: Product;
  count: number;
};

export type Cart = {
  id: string;
  userId: string;
  items: CartItem[];
};
