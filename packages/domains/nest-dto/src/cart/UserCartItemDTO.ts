import { CartItemDTO } from './CartItemDTO';
import { IsUUID } from 'class-validator';

export class UserCartItemDTO extends CartItemDTO {
  @IsUUID()
  public userId: string;
}
