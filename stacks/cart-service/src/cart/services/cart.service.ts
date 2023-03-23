import { Inject, Injectable, Logger } from '@nestjs/common';
import { CartDTO } from '../../shared/dto/CartDTO';
import { CartItemDTO } from '../../shared/dto/CartItemDTO';
import { CART_REPOSITORY, ICartRepository } from '../../repository/interfaces';

@Injectable()
export class CartService {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly carts: ICartRepository
  ) {}

  private readonly logger = new Logger(this.constructor.name);

  // TODO rename or remove
  async findUserCart(userId: string): Promise<CartDTO> {
    return await this.carts.find({ userId });
  }

  async upsertUserCart(userId: string): Promise<CartDTO> {
    this.logger.log(`upsertUserCart(${userId})...`);
    const userCart = await this.carts.find({ userId });
    if (userCart) {
      return userCart;
    }
    return await this.carts.create({ userId });
  }

  async updateUserCartItem(userId: string, cartItem: CartItemDTO): Promise<void> {
    await this.carts.update({ userId }, cartItem);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeByUserId(_userId): void {
    // this.userCarts[userId] = null;
  }
}
