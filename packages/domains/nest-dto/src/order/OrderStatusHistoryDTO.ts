import { IsNumber, IsOptional, IsString } from 'class-validator';

export class OrderStatusHistoryDTO {
  @IsString()
  public status: string;

  @IsOptional()
  @IsNumber()
  public timestamp: number;

  @IsString()
  public comment: string;
}
