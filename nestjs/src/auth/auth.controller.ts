import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class LoginDto {
  @ApiProperty({
    example: 'usu_1@gmail.com',
    description: 'Email del usuario',
    required: true
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'usu123usu',
    description: 'Contraseña del usuario',
    required: true,
    minLength: 6
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Token JWT para autenticación'
  })
  access_token: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ 
    summary: 'Autenticación de usuario', 
    description: 'Endpoint para loguear usuarios y obtener token JWT' 
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Autenticación exitosa', 
    type: LoginResponseDto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid input data' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Invalid credentials' 
  })
  async login(@Body() loginDto: LoginDto) {
    if (!loginDto?.email || !loginDto?.password) {
      throw new UnauthorizedException('Email and password are required');
    }

    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    try {
      return this.authService.login(user);
    } catch (error) {
      throw new UnauthorizedException('Authentication failed');
    }
  }
}