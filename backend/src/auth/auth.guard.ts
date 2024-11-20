import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public-stragegy';
import { catchError, from, map, Observable, of } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { extractTokenFromHeader } from 'src/shared/extract-tokens-from-header';

export interface TokensInterface {
  sub: string; // id
  username: string;
}

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService) {} 
  
  canActivate(context: ExecutionContext): Observable<boolean> {
    // return true for public requests
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return of(true);
    }

    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    return from(this.jwtService.verifyAsync(
      token,
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      }
    )).pipe(
      map(() => {
        return true;
      }),
      catchError((error) => {
        console.log(error);
        throw new UnauthorizedException(error);
      })
    );
  } 
}