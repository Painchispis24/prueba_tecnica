import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../../account/entities/account.entity';

@Injectable()
export class AccountSeeder {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {}

  async seed() {
    const accountsData = [
      {
        holder_name: 'Juan Pérez',
        document_number: '12345678',
        account_type: 'SAVINGS',
        balance: 5000.00,
      },
      {
        holder_name: 'María García',
        document_number: '87654321',
        account_type: 'CHECKING',
        balance: 3000.50,
      },
      {
        holder_name: 'Carlos López',
        document_number: '45678901',
        account_type: 'SAVINGS',
        balance: 7500.75,
      },
    ];

    const accounts = await Promise.all(
      accountsData.map(async (accountData) => {
        const exists = await this.accountRepository.findOne({
          where: { document_number: accountData.document_number },
        });
        if (!exists) {
          return this.accountRepository.create(accountData);
        }
        return null;
      }),
    );

    const newAccounts = accounts.filter(account => account !== null);
    if (newAccounts.length > 0) {
      await this.accountRepository.save(newAccounts);
      console.log(`Seeded ${newAccounts.length} accounts...`);
    } else {
      console.log('All accounts already exist in database');
    }

    return this.accountRepository.find();
  }
}