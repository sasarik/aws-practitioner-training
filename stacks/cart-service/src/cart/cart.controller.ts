import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put, Req } from '@nestjs/common';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';
import { CartService } from './services';
import { UserDTO } from '../shared/dto/UserDTO';
import { CartItemDTO } from '../shared/dto/CartItemDTO';

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
        // total: calculateCartTotal(cart),
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
        // total: calculateCartTotal(cart),
      },
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
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
  async checkout(@Req() req: AppRequest, @Body() body) {
    const userId = getUserIdFromRequest(req);
    const cart = await this.cartService.findByUserId(userId);

    if (!(cart && cart.items.length)) {
      const statusCode = HttpStatus.BAD_REQUEST;
      req.statusCode = statusCode;

      return {
        statusCode,
        message: 'Cart is empty',
      };
    }

    const { id: cartId, items } = cart;
    const total = 0; //calculateCartTotal(cart);
    const order = this.orderService.create({
      ...body, // TODO: validate and pick only necessary data
      userId,
      cartId,
      items,
      total,
    });
    this.cartService.removeByUserId(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order },
    };
  }
}
