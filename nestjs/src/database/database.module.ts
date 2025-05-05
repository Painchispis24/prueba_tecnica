import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../account/entities/account.entity';
import { Transaction } from '../transaction/entities/transaction.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'admin',
      password: 'admin123',
      database: 'servicio_financiero',
      entities: [Account, Transaction,User],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Account, Transaction,User]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}