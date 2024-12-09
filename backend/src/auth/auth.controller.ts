import { Controller, Post, Body, HttpCode, HttpStatus, OnModuleInit } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from './auth.service';
import { Public } from './public-stragegy';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/roles/role.enum';
import { lastValueFrom } from 'rxjs';


@Controller("")
@ApiTags("auth")
export class AuthController implements OnModuleInit {
  constructor(private authService: AuthService) {}

  async onModuleInit() {
    const user: CreateUserDto = {
      username: 'admin',
      email: 'admin@example.com',
      age: 30,
      password: 'admin',
      firstName: 'John',
      secondName: 'Doe',
      thirdName: 'Johnson',
      phoneNumber: '1234567890',
      gender: 'm',
      role: Role.Admin,
    }
    await lastValueFrom(this.authService.signUp(user));
  }
  
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  @ApiOperation({ summary: "User Login" })
  @ApiResponse({
    status: 200,
    description: "The record found",
    type: [User],
  })
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  } 
  
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("signup")
  @ApiOperation({ summary: "User Signup" })
  @ApiResponse({
    status: 200,
    description: "The record create",
    type: [User],
  })
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('refresh')
  refreshTokens(@Body() refreshDto: { refreshToken: string }) {
    return this.authService.refreshTokens(refreshDto.refreshToken);
  }

  @Public()
  @Post('verifyToken')
  verifyToken(@Body() verifyhDto: { accessToken: string }) {
    return this.authService.verifyToken(verifyhDto.accessToken);
  }
}