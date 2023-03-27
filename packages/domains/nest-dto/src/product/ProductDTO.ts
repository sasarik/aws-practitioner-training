import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class ProductDTO {
  @IsUUID()
  public id: string;

  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  public price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  public count?: number;
}
