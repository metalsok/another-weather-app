import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(24)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=,*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;
  status: string;
}
