import { PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class RegisterDto extends PickType(User, ['email', 'password']) {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
