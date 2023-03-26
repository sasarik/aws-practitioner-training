import { IsUUID } from 'class-validator';

export class UserQueryDTO {
  @IsUUID()
  public userId: string;
}
