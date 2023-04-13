import { Inject, Injectable, Logger } from '@nestjs/common';
import { FindOptions, IOrderRepository } from '@domains/nest-repository';
import { CartItemDTO, OrderDTO } from '@domains/nest-dto';
import { DB_CLIENT_SERVICE, IDbClientService } from '@domains/db-client';

type CartDbItem = { id: string; cart_id: string; product_id: string; count: number };

const toCartItemDTO = ({ count, product_id }: CartDbItem): CartItemDTO => ({
  count,
  product: {
    id: product_id,
  },
});

@Injectable()
export class OrdersRepositoryService implements IOrderRepository {
  constructor(
    @Inject(DB_CLIENT_SERVICE)
    private readonly dbClient: IDbClientService
  ) {}

  private readonly logger = new Logger(this.constructor.name);

  async create(order: Omit<OrderDTO, 'id'>): Promise<OrderDTO> {
    this.logger.log(`Create order(user:"${order.userId}", cart:"${order.cartId}")...`);
    const deliveryAddress = JSON.stringify(order.address);
    const statusHistory = JSON.stringify(order.statusHistory);

    const result = await this.dbClient.transactQuery<OrderDTO & { cartDbItems: CartDbItem[] }>([
      `UPDATE carts SET status='ORDERED' WHERE id = '${order.cartId}'`,
      `INSERT INTO orders(user_id, cart_id, status, delivery, status_history)
            VALUES('${order.userId}','${order.cartId}','OPEN','${deliveryAddress}','${statusHistory}')
                RETURNING
                    id,
                    user_id as userId,
                    cart_id as cartId,
                    status,
                    delivery as address,
                    (SELECT json_agg(ci) FROM cart_items ci where ci.cart_id = '${order.cartId}') as "cartDbItems",
                    status_history as statusHistory`,
    ]);
    return result.rows.map((order) => {
      return {
        id: order.id,
        userId: order.userId,
        cartId: order.cartId,
        address: order.address,
        statusHistory: order.statusHistory,
        status: order.status,
        items: (order.cartDbItems ?? []).map(toCartItemDTO),
      };
    })[0];
  }

  async find(options: FindOptions): Promise<OrderDTO[]> {
    if ('userId' in options) {
      return await this.findByUserId(options.userId);
    } else if ('id' in options) {
      return await this.findById(options.id);
    }

    this.exhaustiveCheck(options);
    return [];
  }

  async update(order: OrderDTO): Promise<void> {
    this.logger.log(`update("${order.id}")...`);

    const statusHistory = JSON.stringify(order.statusHistory);
    await this.dbClient.query<OrderDTO & { cartDbItems: CartDbItem[] }>(
      `UPDATE orders SET status = $1, status_history = to_json($2::json) WHERE id = $3`,
      [order.status, statusHistory, order.id]
    );
  }

  async remove(order: OrderDTO): Promise<void> {
    await this.dbClient.transactQuery([
      `DELETE FROM orders WHERE id = '${order.id}'`,
      `DELETE FROM cart_items WHERE cart_id = '${order.cartId}'`,
      `DELETE FROM carts WHERE id = '${order.cartId}'`,
    ]);
  }

  private async findByUserId(userId: string): Promise<OrderDTO[]> {
    this.logger.log(`findByUserId("${userId}")...`);
    const result = await this.dbClient.query<OrderDTO & { cartDbItems: CartDbItem[] }>(`
        SELECT  o.id, o.user_id as "userId", o.cart_id as "cartId", o.status as "status",
                o.delivery as "address", o.status_history as "statusHistory",
                (SELECT  json_agg(ci) FROM cart_items ci where ci.cart_id = o.cart_id) as "cartDbItems"
        FROM orders o
                WHERE o.user_id = '${userId}'
    `);
    return result.rows.map((order) => {
      return {
        id: order.id,
        userId: order.userId,
        cartId: order.cartId,
        address: order.address,
        statusHistory: order.statusHistory,
        status: order.status,
        items: (order.cartDbItems ?? []).map(toCartItemDTO),
      };
    });
  }

  private async findById(orderId: string): Promise<OrderDTO[]> {
    this.logger.log(`findById("${orderId}")...`);
    const result = await this.dbClient.query<OrderDTO & { cartDbItems: CartDbItem[] }>(`
        SELECT  o.id, o.user_id as "userId", o.cart_id as "cartId", o.status as "status",
                o.delivery as "address", o.status_history as "statusHistory",
                (SELECT  json_agg(ci) FROM cart_items ci where ci.cart_id = o.cart_id) as  "cartDbItems"
        FROM orders o
                WHERE o.id = '${orderId}'
    `);
    return result.rows.map((order): OrderDTO => {
      return {
        id: order.id,
        userId: order.userId,
        cartId: order.cartId,
        address: order.address,
        statusHistory: order.statusHistory,
        status: order.status,
        items: (order.cartDbItems ?? []).map(toCartItemDTO),
      };
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private exhaustiveCheck(_param: never): void {
    // This is intentional
  }
}
