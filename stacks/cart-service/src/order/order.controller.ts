import { Controller, Get, HttpStatus, Logger, Param } from "@nestjs/common";
import { OrderService } from "./services";
import { UserIdParamDTO } from "../shared/dto/UserIdParamDTO";

// TODO Ask Ilia for such kind of apis are correct ?
@Controller('api/profile/order/:userId')
export class OrderController {
  constructor(private orderService: OrderService) {}

  private readonly logger = new Logger(this.constructor.name);

  @Get()
  async getUserOrders(@Param() user: UserIdParamDTO) {
    this.logger.log(`getUserOrders(${user.userId})...`);
    const orders = await this.orderService.findByUserId(user.userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      userOrders: orders,
    };
  }
}
