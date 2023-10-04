import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = new User();
    const { email, password } = dto;
    user.email = email;
    user.password = password;
    return this.userRepository.save(user);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      email,
    });
  }
}
