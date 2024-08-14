import { Injectable, UnauthorizedException } from '@nestjs/common';
import { from, map, Observable, switchMap } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}
  
  signIn(username: string, pass: string): Observable<{ access_token: string }> {
    return this.usersService.findUser(username).pipe(
      switchMap(user => {
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.username };
        return from(this.jwtService.signAsync(payload)).pipe(map(jwt => ({ access_token: jwt })));
      })
    );
  } 
  
  signUp(payload: CreateUserDto): Observable<User> {
    return this.usersService.createUser(payload);
  }
}
