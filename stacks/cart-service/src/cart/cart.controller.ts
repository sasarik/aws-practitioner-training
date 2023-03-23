import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';
import { CartService } from './services';
import { UserDTO } from '../shared/dto/UserDTO';
import { CartItemDTO } from '../shared/dto/CartItemDTO';
import { CheckoutDTO } from '../shared/dto/CheckoutDTO';
import { getProductById } from '@helpers/db-client';
import { CartDTO } from '../shared/dto/CartDTO';

@Controller('api/profile/cart/:userId')
export class CartController {
  constructor(private cartService: CartService, private orderService: OrderService) {}

  private readonly logger = new Logger(this.constructor.name);

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get()
  async getUserCart(@Param() user: UserDTO) {
    this.logger.log(`getUserCart(${user.userId})...`);
    const cart: CartDTO = await this.cartService.upsertUserCart(user.userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      userCart: cart,
    };
  }

  // TODO Authorization
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Param() user: UserDTO, @Body() cartItem: CartItemDTO) {
    this.logger.log(`updateUserCart(${user.userId})...`);
    const cartItemProductInfo = await getProductById(cartItem.product.id);
    if (cartItemProductInfo.count - cartItem.count < 0) {
      throw new HttpException('Store: Not Found', HttpStatus.NOT_FOUND);
    }

    await this.cartService.updateUserCartItem(user.userId, cartItem);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK, Updated',
      ref: `api/profile/cart/${user.userId}`,
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  // TODO remove it ?
  @Delete()
  clearUserCart(@Req() req: AppRequest) {
    this.cartService.removeByUserId(getUserIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Post('checkout')
  async checkout(@Param() user: UserDTO, @Body() orderCheckout: CheckoutDTO) {
    const cart = await this.cartService.findUserCart(user.userId);
    if (!(cart && cart.items.length)) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'No Cart Found or Cart is empty',
      };
    }

    const order = await this.orderService.createByUserId({
      userId: user.userId,
      cartId: cart.id,
      address: orderCheckout.address,
      items: cart.items,
      status: 'OPEN',
      statusHistory: [{ status: 'OPEN', timestamp: new Date().getTime(), comment: 'New order' }],
    });
    this.cartService.removeByUserId(user.userId);

    // TODO update products count in stock

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order },
    };
  }
}
