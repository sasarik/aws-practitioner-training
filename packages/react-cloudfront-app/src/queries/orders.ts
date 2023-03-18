import axios, { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import API_PATHS from '~/constants/apiPaths';
import { OrderStatus } from '~/constants/order';
import { Order } from '~/models/Order';
import { useGetAuthorizationToken } from '~/queries/authorization';

export function useOrders() {
  return useQuery<Order[], AxiosError>('orders', async () => {
    const res = await axios.get<Order[]>(`${API_PATHS.order}/order`);
    return res.data;
  });
}

export function useInvalidateOrders() {
  const queryClient = useQueryClient();
  return React.useCallback(() => queryClient.invalidateQueries('orders', { exact: true }), [queryClient]);
}

export function useUpdateOrderStatus() {
  const authToken = useGetAuthorizationToken();
  return useMutation((values: { id: string; status: OrderStatus; comment: string }) => {
    const { id, ...data } = values;
    return axios.put(`${API_PATHS.order}/order/${id}/status`, data, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  });
}

export function useSubmitOrder() {
  const authToken = useGetAuthorizationToken();
  return useMutation((values: Omit<Order, 'id'>) => {
    return axios.put<Omit<Order, 'id'>>(`${API_PATHS.order}/order`, values, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  });
}

export function useInvalidateOrder() {
  const queryClient = useQueryClient();
  return React.useCallback(
    (id: string) => queryClient.invalidateQueries(['order', { id }], { exact: true }),
    [queryClient]
  );
}

export function useDeleteOrder() {
  const authToken = useGetAuthorizationToken();
  return useMutation((id: string) =>
    axios.delete(`${API_PATHS.order}/order/${id}`, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    })
  );
}
