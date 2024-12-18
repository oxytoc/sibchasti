import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { Private, Public } from 'src/auth/public-stragegy';
import { AuthService } from 'src/auth/auth.service';

@Controller('')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService
  ) {}

  @Public()
  @Get()
  findAll(): Observable<User[]> {
    return this.userService.findAllUser();
  }

  @Private()
  @Post("findOne")
  findOne(@Body() findOneDto: {id: string}): Observable<User> {
    return this.userService.viewUser(+findOneDto.id);
  }

  @Post(':id')
  @Private()
  @Roles(Role.User)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Observable<User> {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Private()
  @Post("create")
  signUp(@Body() createUser: CreateUserDto) {
    return this.authService.signUp(createUser).pipe(map(user => user.username));
  }  

  @Private()
  @Post("remove")
  remove(@Param('id') ids: string[]): Observable<{affected?: number}> {
    return this.userService.removeUser(ids);
  }
}
