import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { OrderModule } from '../order/order.module';
import { CartService } from './services';
import { RepositoryModule } from '../repository/repository.module';

describe('CartController', () => {
  let controller: CartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OrderModule, RepositoryModule],
      providers: [CartService],
      controllers: [CartController],
    }).compile();

    controller = module.get<CartController>(CartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
