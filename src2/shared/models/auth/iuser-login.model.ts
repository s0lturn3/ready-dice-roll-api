import { ApiProperty } from "@nestjs/swagger";

export class IUserLogin {

  @ApiProperty()
  usernameOrEmail: string;

  @ApiProperty()
  password: string;
  
}