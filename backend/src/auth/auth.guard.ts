import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public-stragegy';
import { catchError, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';


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
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    return from(this.jwtService.verifyAsync(
      token,
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      }
    )).pipe(
      map(payload => {
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
        request['user'] = payload;
        return true;
      }),
      catchError((error) => {
        console.log(error);
        throw new UnauthorizedException(error);
      })
    )
  } 
  
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}