import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../users/user.entity';
import { LaravelHashService } from '../../../auth/laravel-hash.service';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: LaravelHashService,
  ) {}

  async seed() {
    const usersData = [
      {
        name: 'usuario_3',
        email: 'usu_3@gmail.com',
        password: 'usu123usu', // Contraseña en texto plano
      },
      {
        name: 'usuario_4',
        email: 'usu_4@gmail.com',
        password: 'usu456usu', // Contraseña en texto plano
      },
    ];

    for (const userData of usersData) {
      const exists = await this.userRepository.findOne({ 
        where: { email: userData.email } 
      });
      
      if (!exists) {
        // Hashear la contraseña usando el servicio LaravelHash
        const hashedPassword = await this.hashService.make(userData.password);
        
        await this.userRepository.save(
          this.userRepository.create({
            ...userData,
            password: hashedPassword,
          })
        );
      }
    }
    console.log('Users seeded successfully with Laravel-compatible hashes!');
  }
}