import { Inject, Injectable, Logger } from '@nestjs/common';
import { IOrderRepository, UseByUserIdOption } from '../interfaces';
import { OrderDTO } from '../../shared/dto/order/OrderDTO';
import { DB_CLIENT_SERVICE, IDbClientService } from '../../dbClient/interfaces';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @Inject(DB_CLIENT_SERVICE)
    private readonly dbClient: IDbClientService
  ) {}

  private readonly logger = new Logger(this.constructor.name);

  async create(order: Omit<OrderDTO, 'id'>): Promise<OrderDTO> {
    this.logger.log(`Create order(user:"${order.userId}", cart:"${order.cartId}")...`);
    const deliveryAddress = JSON.stringify(order.address);
    const statusHistory = JSON.stringify(order.statusHistory);

    const result = await this.dbClient.transactQuery<OrderDTO>([
      `UPDATE carts SET status='ORDERED' WHERE id = '${order.cartId}'`,
      `INSERT INTO orders(user_id, cart_id, status, delivery, status_history)
            VALUES('${order.userId}','${order.cartId}','OPEN','${deliveryAddress}','${statusHistory}')
                RETURNING
                    id,
                    user_id as userId,
                    cart_id as cartId,
                    status,
                    delivery as address,
                    (SELECT  json_agg(ci) FROM cart_items ci where ci.cart_id = '${order.cartId}') as items,
                    status_history as statusHistory`,
    ]);
    return result.rows[0];
  }

  async find({ userId }: UseByUserIdOption): Promise<OrderDTO[]> {
    this.logger.log(`find(${userId})...`);
    const result = await this.dbClient.query<OrderDTO>(`
        SELECT  o.id, o.user_id as "userId", o.cart_id as "cartId", o.status as "status",
                o.delivery as "address", o.status_history as "statusHistory",
                (SELECT  json_agg(ci) FROM cart_items ci where ci.cart_id = o.cart_id) as items
        FROM orders o
                WHERE o.user_id = '${userId}'
    `);
    return result.rows;
  }
}
