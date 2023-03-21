import { IsUUID } from 'class-validator';

export class UserDTO {
  @IsUUID()
  public userId: string;
}
