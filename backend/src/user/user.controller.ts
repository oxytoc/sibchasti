import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { Public } from 'src/auth/public-stragegy';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get()
  findAll(): Observable<User[]> {
    return this.userService.findAllUser();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<User> {
    return this.userService.viewUser(+id);
  }

  @Post(':id')
  @Roles(Role.User)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Observable<User> {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Post("create")
  signUp(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  }

  @Post("create")
  remove(@Param('id') ids: string[]): Observable<{affected?: number}> {
    return this.userService.removeUser(ids);
  }
}
