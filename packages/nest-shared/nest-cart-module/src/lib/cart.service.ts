import { Inject, Injectable } from '@nestjs/common';
import { CART_REPOSITORY, ICartRepository } from '@domains/nest-repository';
import { CartDTO, CartItemDTO } from '@domains/nest-dto';

@Injectable()
export class CartService {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly carts: ICartRepository
  ) {}

  // TODO rename or remove
  async findUserCart(userId: string): Promise<CartDTO> {
    return await this.carts.find({ userId });
  }

  async upsertUserCart(userId: string): Promise<CartDTO> {
    const userCart = await this.carts.find({ userId });
    if (userCart) {
      return userCart;
    }
    return await this.carts.create({ userId });
  }

  async updateUserCartItem(userId: string, cartItem: CartItemDTO): Promise<void> {
    await this.carts.update({ userId }, cartItem);
  }

  // TODO rename or remove
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeByUserId(_userId: string): void {
    // this.userCarts[userId] = null;
  }
}
