import { IsUUID } from 'class-validator';

export class UserIdParamDTO {
  @IsUUID()
  public userId: string;
}
