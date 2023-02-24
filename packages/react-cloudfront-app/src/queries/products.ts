import axios, { AxiosError } from 'axios';
import API_PATHS from '~/constants/apiPaths';
import { Product } from '~/models/Product';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import React from 'react';
import { apiRoutes } from '~/constants/apiRoutes';

export const fetchAvailableProducts = async (): Promise<Product[]> => {
  const res = await axios.get<{ products: Product[] }>(apiRoutes.productsService());
  return res.data.products;
};

export const fetchAvailableProductById = async (id: string) => {
  const res = await axios.get<{ product: Product }>(apiRoutes.productById(id));
  return res.data.product;
};

export function useAvailableProducts() {
  return useQuery<Product[], AxiosError>('available-products', fetchAvailableProducts);
}

export function useInvalidateAvailableProducts() {
  const queryClient = useQueryClient();
  return React.useCallback(() => queryClient.invalidateQueries('available-products', { exact: true }), [queryClient]);
}

export function useAvailableProduct(id?: string) {
  return useQuery<Product | undefined, AxiosError>(
    ['product', { id }],
    async () => (id ? await fetchAvailableProductById(id) : undefined),
    { enabled: !!id }
  );
}

export function useRemoveProductCache() {
  const queryClient = useQueryClient();
  return React.useCallback(
    (id?: string) => queryClient.removeQueries(['product', { id }], { exact: true }),
    [queryClient]
  );
}

export function useUpsertAvailableProduct() {
  return useMutation((values: Product) =>
    axios.post<Product>(apiRoutes.productsService(), values, {
      headers: {
        Authorization: `Basic ${localStorage.getItem('authorization_token')}`,
      },
    })
  );
}

export function useDeleteAvailableProduct() {
  return useMutation((id: string) =>
    axios.delete(`${API_PATHS.bff}/product/${id}`, {
      headers: {
        Authorization: `Basic ${localStorage.getItem('authorization_token')}`,
      },
    })
  );
}
