import { Inject, Injectable } from '@nestjs/common';
import { OrderDTO } from '../../shared/dto/order/OrderDTO';
import { IOrderRepository, ORDER_REPOSITORY } from '../../repository/interfaces';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orders: IOrderRepository
  ) {}

  async findById(id: string): Promise<OrderDTO> {
    const orders = await this.orders.find({ id });
    return orders[0];
  }

  async findByUserId(userId: string): Promise<OrderDTO[]> {
    return await this.orders.find({ userId });
  }

  async createByUserId(order: Omit<OrderDTO, 'id'>): Promise<OrderDTO> {
    return await this.orders.create(order);
  }

  async update(order: OrderDTO): Promise<void> {
    await this.orders.update(order);
  }

  async remove(order: OrderDTO): Promise<void> {
    await this.orders.remove(order);
  }
}
