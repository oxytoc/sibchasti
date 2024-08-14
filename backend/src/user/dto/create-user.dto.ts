import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Role } from 'src/roles/role.enum';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @IsAlphanumeric(null, {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;

  @ApiProperty()
  @IsInt()
  age: number;

  @ApiProperty()
  @IsString()
  @IsEnum(['f', 'm', 'u'])
  gender: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password: string;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;
}
