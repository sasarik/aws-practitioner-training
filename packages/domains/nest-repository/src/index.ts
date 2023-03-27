import { CartDTO, CartItemDTO, OrderDTO } from '@domains/nest-dto';

export const ORDER_REPOSITORY = 'OrderEntityRepository';

export type UseByUserIdOption = { userId: string };
export type UseByIdOption = { id: string };
export type FindOptions = UseByUserIdOption | UseByIdOption;

export interface IOrderRepository {
  create: (order: Omit<OrderDTO, 'id'>) => Promise<OrderDTO>;
  remove: (order: OrderDTO) => Promise<void>;
  update: (order: OrderDTO) => Promise<void>;
  find: (options: FindOptions) => Promise<OrderDTO[]>;
}

export const CART_REPOSITORY = 'CartEntityRepository';

export interface ICartRepository {
  create: (options: UseByUserIdOption) => Promise<CartDTO>;
  update: (options: UseByUserIdOption, cartItem: CartItemDTO) => Promise<void>;
  find: (options: UseByUserIdOption) => Promise<CartDTO>;
}
