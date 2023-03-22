import { IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { DeliveryAddressDTO } from "./DeliveryAddressDTO";
import { Type } from "class-transformer";

export class OrderDTO {
  @IsUUID()
  userId: string;

  @IsUUID()
  cartId: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DeliveryAddressDTO)
  delivery: DeliveryAddressDTO;
}
