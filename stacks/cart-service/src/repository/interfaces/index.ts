import { OrderDTO } from '../../shared/dto/OrderDTO';
import { CartDTO } from '../../shared/dto/CartDTO';
import { CartItemDTO } from '../../shared/dto/CartItemDTO';

export const ORDER_REPOSITORY = 'OrderEntityRepository';

export type UseByUserIdOption = { userId: string };

export interface IOrderRepository {
  create: (order: Omit<OrderDTO, 'id'>) => Promise<OrderDTO>;
  find: (options: UseByUserIdOption) => Promise<OrderDTO[]>;
}

export const CART_REPOSITORY = 'CartEntityRepository';

export interface ICartRepository {
  create: (options: UseByUserIdOption) => Promise<CartDTO>;
  update: (options: UseByUserIdOption, cartItem: CartItemDTO) => Promise<void>;
  find: (options: UseByUserIdOption) => Promise<CartDTO>;
}