import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { DB_CLIENT_SERVICE, IDbClientService } from '../../dbClient/interfaces';
import { CartDTO } from '../../shared/dto/CartDTO';
import { CartItemDTO } from '../../shared/dto/CartItemDTO';
import { getProductById } from '@helpers/db-client';

@Injectable()
export class CartService {
  constructor(
    @Inject(DB_CLIENT_SERVICE)
    private readonly dbClient: IDbClientService
  ) {}

  private readonly logger = new Logger(this.constructor.name);

  async findByUserId(userId: string): Promise<CartDTO> {
    try {
      const result = await this.dbClient.query<{ id: string; user_id: string }>(`
        SELECT c.id, c.user_id
            FROM carts c
                WHERE c.user_id = '${userId}'
    `);
      if (result.rowsCount === 1) {
        const itemsResult = await this.dbClient.query<{
          id: string;
          cart_id: string;
          product_id: string;
          count: number;
        }>(`
        SELECT i.id, i.cart_id, i.product_id, i.count
            FROM cart_items i
                WHERE i.cart_id = '${result.rows[0].id}'`);
        const dbItems = itemsResult.rows.map((item) => ({
          count: item.count,
          product: {
            id: item.product_id,
          },
        }));
        const items = await this.updateItemsByProductData(dbItems);
        items.sort((a, b) => a.product.price - b.product.price);
        return {
          id: result.rows[0].id,
          items,
        };
      }
      return undefined;
    } catch (error: unknown) {
      this.logger.error(error);
      if (error instanceof Error) {
        throw new InternalServerErrorException(String(error), { cause: error });
      } else {
        throw new InternalServerErrorException(String(error));
      }
    }
  }

  async findOrCreateByUserId(userId: string): Promise<CartDTO> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      this.logger.log(`findOrCreateByUserId(${userId}):Found`);
      return userCart;
    }
    this.logger.log(`findOrCreateByUserId(${userId}):NotFound, creating a new one`);
    return await this.createByUserId(userId);
  }

  async updateByUserId(userId: string, cartItem: CartItemDTO): Promise<CartDTO> {
    const userCart = await this.findOrCreateByUserId(userId);
    const sqlStatement =
      cartItem.count > 0
        ? `INSERT INTO cart_items(cart_id, product_id, count)
            VALUES('${userCart.id}','${cartItem.product.id}',${cartItem.count})
                ON CONFLICT ON CONSTRAINT cart_items_product_id_key
                DO UPDATE
                SET count = EXCLUDED.count`
        : `DELETE FROM cart_items WHERE cart_id = '${userCart.id}' and product_id = '${cartItem.product.id}'`;
    await this.dbClient.transactQuery<{ id: string; user_id: string }>([sqlStatement]);
    return await this.findByUserId(userId);
  }

  private async createByUserId(userId: string): Promise<CartDTO> {
    const result = await this.dbClient.query<{ id: string; user_id: string }>(
      `
      INSERT INTO CARTS(user_id,created_at,updated_at)
      VALUES ('${userId}',CURRENT_DATE,CURRENT_DATE)
      RETURNING id, user_id
      `
    );
    return {
      id: result.rows[0].id,
      items: [],
    };
  }

  private async updateItemsByProductData(cartItems: CartItemDTO[]): Promise<CartItemDTO[]> {
    this.logger.log(`updateItemsByProductData(${cartItems.length} item(s))...`);
    for (const userCartItem of cartItems) {
      const product = await getProductById(userCartItem.product.id);
      userCartItem.product.title = product.title;
      userCartItem.product.description = product.description;
      userCartItem.product.price = product.price;
      userCartItem.product.count = product.count;
    }
    return cartItems;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeByUserId(_userId): void {
    // this.userCarts[userId] = null;
  }
}
