import { IsUUID } from 'class-validator';

export class QueryDTO {
  @IsUUID()
  public userId: string;
}
