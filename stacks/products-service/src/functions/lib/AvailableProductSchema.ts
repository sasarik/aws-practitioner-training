import { asConst } from 'json-schema-to-ts';

export default asConst({
  type: 'object',
  properties: {
    id: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    title: { type: 'string' },
  },
  required: ['title', 'price'],
});
