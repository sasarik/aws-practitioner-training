import { IsUUID } from 'class-validator';

export class ProductDTO {
  @IsUUID()
  public id: string;
}
