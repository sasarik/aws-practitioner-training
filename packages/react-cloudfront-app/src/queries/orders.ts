import axios, { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { OrderStatus } from '~/constants/order';
import { Order } from '~/models/Order';
import { useGetAuthorizationToken } from '~/queries/authorization';
import { useGetCurrentUser } from '~/queries/user';
import { apiRoutes } from '~/constants/apiRoutes';

export function useOrders() {
  const userId = useGetCurrentUser();
  const authToken = useGetAuthorizationToken();
  return useQuery<Order[], AxiosError>('orders', async () => {
    const res = await axios.get<{ orders: Order[] }>(apiRoutes.getUserOrders(userId), {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
    console.log(`useOrders(${userId}):result`, res.data);
    return res.data.orders ?? [];
  });
}

export function useInvalidateOrders() {
  const queryClient = useQueryClient();
  return React.useCallback(() => queryClient.invalidateQueries('orders', { exact: true }), [queryClient]);
}

export function useUpdateOrderStatus() {
  const userId = useGetCurrentUser();
  const authToken = useGetAuthorizationToken();
  return useMutation((values: { id: string; status: OrderStatus; comment: string }) => {
    const { id, ...data } = values;
    return axios.put(
      apiRoutes.orderStatusById(id),
      { ...data, userId },
      {
        headers: {
          Authorization: `Basic ${authToken}`,
        },
      }
    );
  });
}

export function useSubmitOrder() {
  const userId = useGetCurrentUser();
  const authToken = useGetAuthorizationToken();
  return useMutation((values: Omit<Order, 'id'>) => {
    return axios.post<Omit<Order, 'id'>>(
      apiRoutes.checkout(),
      { ...values, userId },
      {
        headers: {
          Authorization: `Basic ${authToken}`,
        },
      }
    );
  });
}

export function useInvalidateOrder() {
  const queryClient = useQueryClient();
  return React.useCallback(
    (id: string) => queryClient.invalidateQueries(['order', { id }], { exact: true }),
    [queryClient]
  );
}

//  TODO  order delete
export function useDeleteOrder() {
  const authToken = useGetAuthorizationToken();
  return useMutation((id: string) =>
    axios.delete(apiRoutes.orderById(id), {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    })
  );
}
