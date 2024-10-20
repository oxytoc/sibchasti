import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { from, Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto): Observable<User> {
    const user: User = new User();
    user.firstName = createUserDto.firstName;
    user.secondName = createUserDto.secondName;
    user.thirdName = createUserDto.thirdName;
    user.phoneNumber = createUserDto.phoneNumber;
    user.age = createUserDto.age;
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.gender = createUserDto.gender;
    user.role = createUserDto.role;
    return from(this.userRepository.save(user));
  }

  findAllUser(): Observable<User[]> {
    return from(this.userRepository.find());
  }

  viewUser(id: number): Observable<User> {
    return from(this.userRepository.findOneBy({ id }));
  }

  findUser(username: string): Observable<User> {
    return from(this.userRepository.findOneBy({ username }))
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): Observable<User> {
    let user: User = new User();
    Object.keys(updateUserDto).forEach(key => user[key] = updateUserDto[key])
    user.id = id;
    return from(this.userRepository.save(user));
  }

  removeUser(ids: string[]): Observable<{ affected?: number }> {
    return from(this.userRepository.delete(ids.map(id => +id)));
  }
}
