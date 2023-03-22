import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put, Req } from '@nestjs/common';
// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';
import { CartService } from './services';
import { UserDTO } from '../shared/dto/UserDTO';
import { CartItemDTO } from '../shared/dto/CartItemDTO';
import { CheckoutDTO } from '../shared/dto/CheckoutDTO';

@Controller('api/profile/cart/:userId')
export class CartController {
  constructor(private cartService: CartService, private orderService: OrderService) {}

  private readonly logger = new Logger(this.constructor.name);

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Param() user: UserDTO) {
    this.logger.log(`findUserCart(${user.userId})...`);
    const userCart = await this.cartService.findOrCreateByUserId(user.userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      userCart: {
        userId: user.userId,
        cart: userCart,
      },
    };
  }

  // TODO Authorization
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Param() user: UserDTO, @Body() cartItem: CartItemDTO) {
    this.logger.log(`updateUserCart(${user.userId})...`);
    const userCart = await this.cartService.updateByUserId(user.userId, cartItem);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      userCart: {
        userId: user.userId,
        cart: userCart,
      },
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
    const cart = await this.cartService.findByUserId(user.userId);
    if (!(cart && cart.items.length)) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'No Cart Found or Cart is empty',
      };
    }

    const order = await this.orderService.createByUserId(user.userId, {
      userId: user.userId,
      cartId: cart.id,
      delivery: orderCheckout.address,
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
