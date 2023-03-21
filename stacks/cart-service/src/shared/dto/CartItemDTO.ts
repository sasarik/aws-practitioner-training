import { IsNotEmpty, IsNumber, Min, ValidateNested } from 'class-validator';
import { ProductDTO } from './ProductDTO';
import { Type } from 'class-transformer';

export class CartItemDTO {
  @IsNumber()
  @Min(0)
  public count: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ProductDTO)
  public product: ProductDTO;
}
