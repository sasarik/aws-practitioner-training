import { DeliveryAddressDTO } from '../order/DeliveryAddressDTO';
import { IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CheckoutDTO {
  @IsUUID()
  public userId: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DeliveryAddressDTO)
  address: DeliveryAddressDTO;
}
