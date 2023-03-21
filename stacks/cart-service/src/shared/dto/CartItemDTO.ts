import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { ProductDTO } from './ProductDTO';
import { Type } from 'class-transformer';

export class CartItemDTO {
  @IsNumber()
  public count: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ProductDTO)
  public product: ProductDTO;
}
