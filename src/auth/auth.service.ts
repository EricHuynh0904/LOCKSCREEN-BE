import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';   
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {  NotFoundException, UnauthorizedException } from '@nestjs/common';




@Injectable()
export class AuthService {
    
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}

    async register(RegisterUserDto: RegisterUserDto) {
        const hashedPassword = await this.hashPassword(RegisterUserDto.password);
       return await this.userRepository.save({...RegisterUserDto, refreshToken: 'refresh_token_string', password: hashedPassword});
    }

    async hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
       
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }

    async signIn(LoginUserDto: LoginUserDto): Promise<any> {
        const user = await this.userRepository.findOne({ where: { email: LoginUserDto.email } });
         console.log('User:', user);
        if (!user) {
            throw new NotFoundException('Email not found');
        }


        const isMatch = await bcrypt.compare(LoginUserDto.password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('Invalid Password');
        }

        const payload = { sub: user.id, email: user.email };
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: '1h',
        });
    return {
      access_token: accessToken,
    };

    }

  

}