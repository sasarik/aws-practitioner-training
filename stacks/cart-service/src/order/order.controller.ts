import { Controller, Get, HttpStatus, Logger, Param } from '@nestjs/common';
import { OrderService } from './services';
import { UserDTO } from '../shared/dto/UserDTO';

@Controller('api/profile/order/:userId')
export class OrderController {
  constructor(private orderService: OrderService) {}

  private readonly logger = new Logger(this.constructor.name);

  @Get()
  async getUserOrders(@Param() user: UserDTO) {
    this.logger.log(`getUserOrders(${user.userId})...`);
    const orders = await this.orderService.findOrdersByUserId(user.userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      userOrders: orders,
    };
  }
}
