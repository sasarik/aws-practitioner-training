import { IsNumber, IsString } from 'class-validator';

export class OrderStatusHistoryDTO {
  @IsString()
  public status: string;
  @IsNumber()
  public timestamp: number;
  @IsString()
  public comment: string;
}
