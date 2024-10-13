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

const phoneRegEx = /^8(?:\d{3}){2}(?:\d{2}){2}$/

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3, { message: 'Имя пользователя дожно иметь минимум 3 символа.' })
  @IsAlphanumeric(null, {
    message: 'Имя пользователя дожен состоять из английских букв и цифр.',
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail(null, { message: 'Введите корректный email' })
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
    message: `Паролт должен содержать минимум 8 и максимум 20 символов, 
    как минимум одну заглавную букву, 
    одну строчную, 
    одно число и 
    один специальный символ`,
  })
  password: string;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Имя должно иметь минимум 2 символа.' })
    firstName: string;
  
  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'Фамилия должна иметь минимум 2 символа.' })
    secondName: string;

  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'Отчество должно иметь минимум 2 символа.' })
    thirdName: string;

  @ApiProperty()
  @Matches(phoneRegEx, {
    message: `Номер телефона должен быть введён в формате 81234567890`,
  })
    phoneNumber: string;
}
