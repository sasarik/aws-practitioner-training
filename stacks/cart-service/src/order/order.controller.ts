import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Put, Query } from '@nestjs/common';
import { OrderService } from './services';
import { UserQueryDTO } from '../shared/dto/params/UserQueryDTO';
import { OrderStatusHistoryDTO } from '../shared/dto/order/OrderStatusHistoryDTO';

@Controller('api/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  private readonly logger = new Logger(this.constructor.name);

  @Get()
  async getUserOrders(@Query() query: UserQueryDTO) {
    this.logger.log(`getUserOrders(${query.userId})...`);
    const orders = await this.orderService.findByUserId(query.userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      orders,
    };
  }

  @Get(':id')
  async getOrder(@Param('id') orderId: string) {
    this.logger.log(`getOrder("${orderId}")...`);
    const order = await this.orderService.findById(orderId);
    if (!order) {
      throw new HttpException('Order: Not Found', HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      order,
    };
  }

  @Put(':id/status')
  async updateOrderStatus(@Param('id') orderId: string, @Body() statusHistory: OrderStatusHistoryDTO) {
    this.logger.log(`updateOrderStatus("${orderId}")...`);
    statusHistory.timestamp = new Date().getTime();

    const order = await this.orderService.findById(orderId);
    if (!order) {
      throw new HttpException('Order: Not Found', HttpStatus.NOT_FOUND);
    }
    await this.orderService.update({
      ...order,
      status: statusHistory.status,
      statusHistory: [...order.statusHistory, statusHistory],
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'OK, Did Update',
    };
  }
}
