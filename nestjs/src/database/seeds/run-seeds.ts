import { NestFactory } from '@nestjs/core';
import { SeedsModule } from './seeds.module';
import { UserSeeder } from './seeders/UserSeeder';
import { AccountSeeder } from './seeders/AccountSeeder';
import { TransactionSeeder } from './seeders/TransactionSeeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedsModule);
  
  try {
    // Ejecutar seeders en orden
    const userSeeder = app.get(UserSeeder);
    await userSeeder.seed();
    
    const accountSeeder = app.get(AccountSeeder);
    await accountSeeder.seed();

    const transactionSeeder = app.get(TransactionSeeder);
    await transactionSeeder.seed();

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Seeding failed!');
    console.error(error);
    process.exit(1);
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();