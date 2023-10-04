import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
@ApiTags('Authentications')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}
  /* @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request) {
    // After successful authentication, the user's session will be established
    // You can implement additional logic here, such as returning a JWT token or setting a cookie
    return req.user;
  } */

  @Post('login')
  async login(@Body() credentials: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      credentials.username,
      credentials.password,
    );
    if (user) {
      // Return a JWT token or set a session cookie
      return { message: 'Login successful', user };
    }
    return { message: 'Invalid credentials' };
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const { email, password } = dto;
    const hashedPassword = await this.authService.hashPassword(password);
    return this.userService.createUser({ email, password: hashedPassword });
  }
}
