import { IsArray, IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator';
import { DeliveryAddressDTO } from './DeliveryAddressDTO';
import { Type } from 'class-transformer';
import { CartItemDTO } from './CartItemDTO';
import { OrderStatusHistoryDTO } from './OrderStatusHistoryDTO';

export class OrderDTO {
  @IsUUID()
  id: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  cartId: string;

  @IsString()
  status: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DeliveryAddressDTO)
  address: DeliveryAddressDTO;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemDTO)
  public items: CartItemDTO[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderStatusHistoryDTO)
  public statusHistory: OrderStatusHistoryDTO[];
}
