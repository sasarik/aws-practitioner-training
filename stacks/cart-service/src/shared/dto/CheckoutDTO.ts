import { DeliveryAddressDTO } from './DeliveryAddressDTO';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CheckoutDTO {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DeliveryAddressDTO)
  address: DeliveryAddressDTO;
}
