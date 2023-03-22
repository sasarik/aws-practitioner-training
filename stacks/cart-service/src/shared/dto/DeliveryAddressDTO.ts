import { IsOptional, IsString } from 'class-validator';

export class DeliveryAddressDTO {
  @IsString()
  public address: string;

  @IsString()
  @IsOptional()
  public comment: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;
}
