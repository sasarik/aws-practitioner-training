import { Controller, Get, HttpStatus, Logger, Query } from '@nestjs/common';
import { OrderService } from './services';
import { QueryDTO } from '../shared/dto/query/QueryDTO';

@Controller('api/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  private readonly logger = new Logger(this.constructor.name);

  @Get()
  async getUserOrders(@Query() query: QueryDTO) {
    this.logger.log(`getUserOrders(${query.userId})...`);
    const orders = await this.orderService.findByUserId(query.userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      userOrders: orders,
    };
  }
}
