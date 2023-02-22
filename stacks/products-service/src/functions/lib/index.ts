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

export const omittingDbCommandsOutputAttributes = (item) => {
  if (item) {
    const result = {};
    const entries = Object.entries(item);
    for (const [key, value] of entries) {
      const newEntry = { [key]: Object.values(value)[0] };
      Object.assign(result, newEntry);
    }
    return result;
  }
  return item;
};
