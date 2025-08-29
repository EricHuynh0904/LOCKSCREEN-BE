import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() RegisterUserDto: RegisterUserDto): Promise<UserEntity> {
    console.log('register api');
    console.log(RegisterUserDto);
    return this.authService.register(RegisterUserDto);

  }

  @Post('login')
  @UsePipes(ValidationPipe)
  signIn(@Body() LoginUserDto: LoginUserDto) :Promise<any> {
    
    console.log('login')
    console.log(LoginUserDto);
    return this.authService.signIn(LoginUserDto);
  }

   @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }


  
}
