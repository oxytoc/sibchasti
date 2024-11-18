import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { from, map, Observable, switchMap } from 'rxjs';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { extractTokenFromHeader } from 'src/shared/extract-tokens-from-header';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokensInterface } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
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
      switchMap((userTokens: TokensInterface) => {
        return this.userService.viewUser(Number(userTokens.sub))
      }),
      map((user) => requiredRoles.some((role) => user?.role === role)),
    )
  }
}
