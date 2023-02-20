import axios, { AxiosError } from 'axios';
import API_PATHS from '~/constants/apiPaths';
import { AvailableProduct, Product } from '~/models/Product';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import React from 'react';
import { apiRoutes } from '~/constants/apiRoutes';

const toAvailableProducts = (product: Product, index: number) => ({
  ...product,
  count: index + 1,
});

export const fetchAvailableProducts = async () => {
  const res = await axios.get<{ products: Product[] }>(apiRoutes.getAvailableProductsListUrl());
  // TODO AR error(s) handling ?
  return res.data.products.map(toAvailableProducts);
};

export function useAvailableProducts() {
  return useQuery<AvailableProduct[], AxiosError>('available-products', fetchAvailableProducts);
}

export function useInvalidateAvailableProducts() {
  const queryClient = useQueryClient();
  return React.useCallback(() => queryClient.invalidateQueries('available-products', { exact: true }), [queryClient]);
}

export function useAvailableProduct(id?: string) {
  return useQuery<AvailableProduct, AxiosError>(
    ['product', { id }],
    async () => {
      const res = await axios.get<AvailableProduct>(`${API_PATHS.bff}/product/${id}`);
      return res.data;
    },
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
  return useMutation((values: AvailableProduct) =>
    axios.put<AvailableProduct>(`${API_PATHS.bff}/product`, values, {
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
