import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { LaravelHashService } from './laravel-hash.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private laravelHash: LaravelHashService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    
    const user = await this.usersRepository.findOne({ 
      where: { email },
      select: ['id', 'name', 'email', 'password']
    });
  
    if (!user) {
      return null;
    }
  
    const isPasswordValid = await this.laravelHash.compare(pass, user.password);
  
    if (!isPasswordValid) {
      return null;
    }
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}