import { Inject, Injectable } from '@nestjs/common';
import { OrderDTO } from '../../shared/dto/OrderDTO';
import { IOrderRepository, ORDER_REPOSITORY } from '../../repository/interfaces';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orders: IOrderRepository
  ) {}

  async findOrdersByUserId(userId: string): Promise<OrderDTO[]> {
    return this.orders.find({ userId });
  }

  async createByUserId(order: Omit<OrderDTO, 'id'>) {
    return this.orders.create(order);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_orderId, _data) {
    return undefined;
    // const order = this.findById(orderId);
    //
    // if (!order) {
    //   throw new Error('Order does not exist.');
    // }
    //
    // this.order[orderId] = {
    //   ...data,
    //   id: orderId,
    // };
  }
}
