import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post, Put, Query } from '@nestjs/common';
// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { OrderService } from '../order';
import { CartService } from './services';
import { CheckoutDTO, UserQueryDTO } from '@domains/nest-dto';
import { getProductById } from '@helpers/db-client';
import { CartDTO } from '@domains/nest-dto';
import { UserCartItemDTO } from '@domains/nest-dto';

@Controller('api/carts')
export class CartController {
  constructor(private cartService: CartService, private orderService: OrderService) {}

  // TODO inject Logger via interface
  private readonly logger = new Logger(this.constructor.name);

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get()
  async getUserCart(@Query() query: UserQueryDTO) {
    this.logger.log(`getUserCart(${query.userId})...`);
    const cart: CartDTO = await this.cartService.upsertUserCart(query.userId);

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
  async updateUserCartItem(@Body() userCartItem: UserCartItemDTO) {
    this.logger.log(`updateUserCart(${userCartItem.userId})...`);
    // TODO get it from products Repository :)
    const cartItemProductInfo = await getProductById(userCartItem.product.id);
    if (cartItemProductInfo.count - userCartItem.count < 0) {
      throw new HttpException('Cart: Not Found', HttpStatus.NOT_FOUND);
    }

    await this.cartService.updateUserCartItem(userCartItem.userId, userCartItem);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK, Did update',
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  // TODO remove it ?
  // @Delete()
  // clearUserCart(@Req() _req: AppRequest) {
  //   // this.cartService.removeByUserId(getUserIdFromRequest(req));
  //
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'OK',
  //   };
  // }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Post('checkout')
  async checkout(@Body() orderCheckout: CheckoutDTO) {
    const cart = await this.cartService.findUserCart(orderCheckout.userId);
    if (!(cart && cart.items.length)) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'No Cart Found or Cart is empty',
      };
    }

    const order = await this.orderService.createByUserId({
      userId: orderCheckout.userId,
      cartId: cart.id,
      address: orderCheckout.address,
      items: cart.items,
      status: 'OPEN',
      statusHistory: [{ status: 'OPEN', timestamp: new Date().getTime(), comment: 'New order' }],
    });
    this.cartService.removeByUserId(orderCheckout.userId);

    //  TODO update products count in stock

    return {
      statusCode: HttpStatus.OK,
      message: 'OK, Did Checkout',
      order,
    };
  }
}
