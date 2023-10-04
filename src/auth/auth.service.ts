import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { compare, hash } from 'bcrypt';
@Injectable()
export class AuthService {
  private readonly saltRounds = 10;
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}
  async validateUser(username: string, password: string): Promise<User | null> {
    // Implement your user validation logic here
    // This could involve querying a database or calling an API to verify the user's credentials
    // Return the user object if validation is successful, or null if validation fails
    // Example:
    // const user = await this.userService.getUserByEmail(username);
    // if (user && user.password === password) {
    //   return user;
    // }
    // return null;
    const user = await this.userService.getUserByEmail(username);
    if (user) {
      const isPasswordValid = await this.comparePasswords(
        password,
        user.password,
      );
      if (isPasswordValid) {
        return user;
      }
    }
    return null;
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, this.saltRounds);
  }
}
