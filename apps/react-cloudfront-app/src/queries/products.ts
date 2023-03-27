import axios, { AxiosError } from 'axios';
import { Product } from '~/models/Product';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import React from 'react';
import { apiRoutes } from '~/constants/apiRoutes';
import { useGetAuthorizationToken } from '~/queries/authorization';

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
  const authToken = useGetAuthorizationToken();
  return useMutation((product: Product) => {
    const upsertMethod = product.id ? axios.put : axios.post;
    return upsertMethod<Product>(apiRoutes.productsService(), product, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  });
}

export function useDeleteAvailableProduct() {
  const authToken = useGetAuthorizationToken();
  return useMutation((id: string) => {
    return axios.delete(apiRoutes.productById(id), {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  });
}
