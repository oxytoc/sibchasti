import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from './auth.service';
import { Public } from './public-stragegy';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';


@Controller("")
@ApiTags("auth")
export class AuthController {
  constructor(private authService: AuthService) {} 
  
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