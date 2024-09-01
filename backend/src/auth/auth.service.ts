import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { combineLatest, from, map, Observable, switchMap } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';


export interface Tokens {
  accessToken: string;
  refreshToken: string;
}


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService) {}
  
  signIn(username: string, pass: string): Observable<Tokens> {
    return this.usersService.findUser(username).pipe(
      switchMap(user => {
        if (!user) {
          throw new UnauthorizedException('User not found');
        }

        if (user?.password !== pass) {
          throw new UnauthorizedException('Password is incorrect');
        }
        const payload = { sub: user.id, username: user.username };
        const tokens = this.getTokens(user.id.toString(), user.username);
        return tokens;
      })
    );
  } 
  
  signUp(payload: CreateUserDto): Observable<Tokens> {
    return this.usersService.findUser(payload.username).pipe(
      switchMap(user => {
        if (user) {
          throw new UnauthorizedException('Username already exists');
        }
        return this.usersService.createUser(payload);
      }),
      switchMap(newUser => {
        const tokens = this.getTokens(newUser.id.toString(), newUser.username);
        return tokens;
      })
    )
  }

  refreshTokens(refreshToken: string, username: string): Observable<Tokens> {
    return this.usersService.findUser(username).pipe(
      switchMap(user => {
        if (!user) {
          throw new UnauthorizedException('User not found');
        }
        return from(this.jwtService.verifyAsync(refreshToken, {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        })).pipe(
          switchMap(token => {
            if (!token) {
              throw new ForbiddenException('Access Denied');
            }
            const tokens = this.getTokens(user.id.toString(), user.username);
            return tokens;
          })
        )}
      ));
  }
  

  private getTokens(userId: string, username: string): Observable<Tokens> {
    return from(this.jwtService.signAsync(
      {
        sub: userId,
        username,
      },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '1d',
      },
    ))
    .pipe(switchMap((accessToken => {
      return from(this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ))
      .pipe(map(refreshToken => ({accessToken, refreshToken})))
    })));
  }
}
