import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { PostgresDbModule } from '../../dbClient/postgres/postgresDb.module';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PostgresDbModule],
      providers: [CartService],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
