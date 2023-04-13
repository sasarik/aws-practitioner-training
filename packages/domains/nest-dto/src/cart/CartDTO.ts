import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';

import { CartItemDTO } from './CartItemDTO';

export class CartDTO {
  @IsUUID()
  public id: string;

  @IsUUID()
  public userId: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemDTO)
  public items: CartItemDTO[];
}
