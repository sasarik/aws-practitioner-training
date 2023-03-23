import axios, { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CartItem } from '~/models/CartItem';
import { apiRoutes } from '~/constants/apiRoutes';
import { useGetCurrentUser } from '~/queries/user';
import { useGetAuthorizationToken } from '~/queries/authorization';

export function useCart() {
  const userId = useGetCurrentUser();
  const authToken = useGetAuthorizationToken();
  return useQuery<CartItem[], AxiosError>('cart', async () => {
    const res = await axios.get<{
      userCart: {
        id: string;
        items: CartItem[];
        total: number;
      };
    }>(apiRoutes.cartByUserId(userId), {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
    console.log(`useCart(${userId}):result`, res.data);
    return res.data.userCart.items ?? [];
  });
}

export function useCartData() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<CartItem[]>('cart');
}

export function useInvalidateCart() {
  const queryClient = useQueryClient();
  return React.useCallback(() => queryClient.invalidateQueries('cart', { exact: true }), [queryClient]);
}

export function useUpsertCart() {
  const userId = useGetCurrentUser();
  const authToken = useGetAuthorizationToken();
  return useMutation((values: CartItem) =>
    axios.put<CartItem[]>(apiRoutes.cartByUserId(userId), values, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    })
  );
}
