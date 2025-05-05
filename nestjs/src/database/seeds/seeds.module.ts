import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { AccountSeeder } from './seeders/AccountSeeder';
import { TransactionSeeder } from './seeders/TransactionSeeder';
import { UserSeeder } from './seeders/UserSeeder';
import { LaravelHashService } from 'src/auth/laravel-hash.service';

@Module({
  imports: [DatabaseModule],
  providers: [AccountSeeder, TransactionSeeder,LaravelHashService, UserSeeder],
})
export class SeedsModule {}