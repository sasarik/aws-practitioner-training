import { Inject, Injectable, Logger } from '@nestjs/common';
import { DB_CLIENT_SERVICE, IDbClientService } from '../../dbClient/interfaces';
import { ICartRepository, UseByUserIdOption } from '../interfaces';
import { CartDTO } from '../../shared/dto/cart/CartDTO';
import { CartItemDTO } from '../../shared/dto/cart/CartItemDTO';
import { getProductById } from '@helpers/db-client';

@Injectable()
export class CartRepository implements ICartRepository {
  constructor(
    @Inject(DB_CLIENT_SERVICE)
    private readonly dbClient: IDbClientService
  ) {}

  private readonly logger = new Logger(this.constructor.name);

  async create({ userId }: UseByUserIdOption): Promise<CartDTO> {
    this.logger.log(`Create cart(user:"${userId}")...`);

    const result = await this.dbClient.query<CartDTO>(`
      INSERT INTO CARTS(user_id,created_at,updated_at)
      VALUES ('${userId}',CURRENT_DATE,CURRENT_DATE)
      RETURNING id, user_id as "userId"`);
    const newCart = result.rows[0];
    newCart.items = newCart.items ?? [];
    return newCart;
  }

  async find({ userId }: UseByUserIdOption): Promise<CartDTO> {
    this.logger.log(`find(${userId})...`);

    const result = await this.dbClient.query<{
      id: string;
      userId: string;
      cartDbItems: { id: string; cart_id: string; product_id: string; count: number }[];
      items: CartItemDTO[];
    }>(`
        SELECT
            c.id, c.user_id as "userId",
            (SELECT  json_agg(ci) FROM cart_items ci where ci.cart_id = c.id) as "cartDbItems"
            FROM carts c
                WHERE c.status = 'OPEN' and c.user_id = '${userId}'
    `);
    if (result.rowsCount === 1) {
      this.logger.log(`find(${userId}) -> Cart Found`);
      const cart = result.rows[0];
      cart.items = (cart.cartDbItems ?? []).map((item) => ({
        count: item.count,
        product: {
          id: item.product_id,
        },
      }));
      if (cart.items.length > 0) {
        cart.items = await this.updateItemsWithProductData(cart.items);
        cart.items.sort((a, b) => a.product.price - b.product.price);
      }
      return cart;
    }
    this.logger.log(`find(${userId}) -> Cart Not Found`);
  }

  async update({ userId }: UseByUserIdOption, cartItem: CartItemDTO): Promise<void> {
    this.logger.log(`update("${userId}","${cartItem.product.id}")...`);
    const userCart = await this.find({ userId });
    const sqlStatement =
      cartItem.count > 0
        ? `INSERT INTO cart_items(cart_id, product_id, count)
            VALUES('${userCart.id}','${cartItem.product.id}',${cartItem.count})
                ON CONFLICT ON CONSTRAINT cart_items_cart_id_product_id_key
                DO UPDATE
                SET count = EXCLUDED.count`
        : `DELETE FROM cart_items WHERE cart_id = '${userCart.id}' and product_id = '${cartItem.product.id}'`;
    await this.dbClient.transactQuery<{ id: string; user_id: string }>([sqlStatement]);
  }

  private async updateItemsWithProductData(cartItems: CartItemDTO[]): Promise<CartItemDTO[]> {
    this.logger.log(`updateItemsWithProductData(${cartItems.length} item(s))...`);
    // TODO get them batch / bulk from dynamoDb.... from products Repository :)
    for (const userCartItem of cartItems) {
      const product = await getProductById(userCartItem.product.id);
      userCartItem.product.title = product.title;
      userCartItem.product.description = product.description;
      userCartItem.product.price = product.price;
      userCartItem.product.count = product.count;
    }
    return cartItems;
  }
}
