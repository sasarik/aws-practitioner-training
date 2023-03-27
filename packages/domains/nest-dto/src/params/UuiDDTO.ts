import { IsUUID } from 'class-validator';

export class UuiDDTO {
  @IsUUID()
  public id: string;
}
