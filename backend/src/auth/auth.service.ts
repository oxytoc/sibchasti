import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { catchError, combineLatest, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { TokensInterface } from './auth.guard';


export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface TokensAndUser {
  tokens: Tokens;
  userId: string;
  username: string;
}


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService) {}
  
  signIn(username: string, pass: string): Observable<TokensAndUser> {
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
        return combineLatest([tokens, of(user)]);
      }),
      map(([tokens, user]) => {
        return {
          userId: user.id.toString(),
          username: user.username,
          tokens
        };
      })
    );
  } 
  
  signUp(payload: CreateUserDto): Observable<TokensAndUser> {
    return this.usersService.findUser(payload.username).pipe(
      switchMap(user => {
        if (user) {
          throw new UnauthorizedException('Username already exists');
        }
        return this.usersService.createUser(payload);
      }),
      switchMap(newUser => {
        return combineLatest([this.getTokens(newUser.id.toString(), newUser.username), of(newUser)]);
      }),
      map(([tokens, user]) => {
        return {
          userId: user.id.toString(),
          username: user.username,
          tokens
        };
      })
    )
  }

  refreshTokens(refreshToken: string): Observable<TokensAndUser> {
    return from(this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    })).pipe(
      switchMap((token: TokensInterface) => {
        if (!token) {
          throw new ForbiddenException('Access Denied');
        }
        return this.usersService.findUser(token.username)
      }),
      switchMap(user => {
        if (!user) {
          throw new UnauthorizedException('User not found');
        }
        const tokens = this.getTokens(user.id.toString(), user.username);
        return tokens.pipe(
          map(tokens => ({
            tokens,
            userId: user.id.toString(),
            username: user.username,
          }))
        );
      }),
    )
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

  verifyToken(accessToken: string): Observable<TokensAndUser> {
    return from(this.jwtService.verifyAsync(
      accessToken,
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      }
    )).pipe(
        catchError(error => { throw new NotFoundException(`Token not found, error - ${error}`); }),
        map((tokens: TokensInterface) => ({
        userId: tokens.sub,
        username: tokens.username,
        tokens: {
          accessToken,
          refreshToken: null, // Refresh token is not provided in the access token
        }
      }))
    )
  }
}
