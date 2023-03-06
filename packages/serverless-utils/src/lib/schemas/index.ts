import { asConst, FromSchema } from 'json-schema-to-ts';

export const AvailableProductSchema = asConst({
  type: 'object',
  properties: {
    id: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    title: { type: 'string' },
  },
  required: ['title', 'price', 'description'],
});

export type StockDbItem = {
  productId: string;
  count: number;
};

export type ProductDbItem = {
  id: string;
  title: string;
  price: number;
  description: string;
};

export type AvailableProduct = FromSchema<typeof AvailableProductSchema>;
