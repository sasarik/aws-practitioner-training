import { Inject, Injectable, Logger } from '@nestjs/common';

import { Order } from '../models';
import { DB_CLIENT_SERVICE, IDbClientService } from '../../dbClient/interfaces';
import { OrderDTO } from '../../shared/dto/OrderDTO';

@Injectable()
export class OrderService {
  constructor(
    @Inject(DB_CLIENT_SERVICE)
    private readonly dbClient: IDbClientService
  ) {}

  private readonly logger = new Logger(this.constructor.name);

  // private orders: Record<string, Order> = {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findById(_orderId: string): Order {
    // return this.orders[orderId];
    return undefined;
  }

  async createByUserId(userId: string, order: OrderDTO) {
    this.logger.log(`Create order(user:"${userId}", cart:"${order.cartId}")...`);
    const deliveryAddress = JSON.stringify(order.delivery);
    const result = await this.dbClient.transactQuery<{ id: string; user_id: string; cart_id: string }>([
      `UPDATE carts SET status='ORDERED' WHERE id = '${order.cartId}'`,
      `
        INSERT INTO orders(user_id, cart_id, status, delivery)
            VALUES('${userId}','${order.cartId}','OPEN','${deliveryAddress}')
                RETURNING id, user_id, cart_id
    `,
    ]);
    return {
      id: result.rows[0].id,
      userId: result.rows[0].user_id,
      cartId: result.rows[0].cart_id,
    };
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
    // this.orders[orderId] = {
    //   ...data,
    //   id: orderId,
    // };
  }
}
