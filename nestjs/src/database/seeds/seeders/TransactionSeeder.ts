import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, TransactionType } from '../../../transaction/entities/transaction.entity';
import { Account } from '../../../account/entities/account.entity';
import { CreateTransactionDto } from '../../../transaction/dto/create-transaction.dto';

@Injectable()
export class TransactionSeeder {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {}

  async seed() {
    const accounts = await this.accountRepository.find();
    if (accounts.length < 2) {
      console.log('Not enough accounts to create transactions');
      return;
    }

    const [account1, account2] = accounts;

    // Crear transacciones usando un enfoque similar al servicio
    await this.createDeposit(account1.id, 1000.00);
    await this.createWithdraw(account1.id, 500.00);
    await this.createTransfer(account1.id, account2.id, 300.00);
    await this.createDeposit(account2.id, 2000.00);

    console.log('Seeded transactions successfully!');
  }

  private async createDeposit(accountId: number, amount: number) {
    const dto: CreateTransactionDto = {
      amount,
      sourceAccountId: accountId,
    };

    const account = await this.accountRepository.findOneBy({ id: accountId });
    if (!account) return;

    account.balance = Number(account.balance) + Number(amount);
    await this.accountRepository.save(account);

    await this.transactionRepository.save({
      type: TransactionType.DEPOSIT,
      amount,
      sourceAccount: { id: accountId }
    });
  }

  private async createWithdraw(accountId: number, amount: number) {
    const dto: CreateTransactionDto = {
      amount,
      sourceAccountId: accountId,
    };

    const account = await this.accountRepository.findOneBy({ id: accountId });
    if (!account) return;
    if (account.balance < amount) {
      console.log(`Insufficient balance for withdrawal from account ${accountId}`);
      return;
    }

    account.balance = Number(account.balance) - Number(amount);
    await this.accountRepository.save(account);

    await this.transactionRepository.save({
      type: TransactionType.WITHDRAW,
      amount,
      sourceAccount: { id: accountId }
    });
  }

  private async createTransfer(sourceAccountId: number, targetAccountId: number, amount: number) {
    const dto: CreateTransactionDto = {
      amount,
      sourceAccountId,
      targetAccountId
    };

    const sourceAccount = await this.accountRepository.findOneBy({ id: sourceAccountId });
    const targetAccount = await this.accountRepository.findOneBy({ id: targetAccountId });
    
    if (!sourceAccount || !targetAccount) return;
    if (sourceAccount.balance < amount) {
      console.log(`Insufficient balance for transfer from account ${sourceAccountId}`);
      return;
    }

    sourceAccount.balance = Number(sourceAccount.balance) - Number(amount);
    targetAccount.balance = Number(targetAccount.balance) + Number(amount);

    await this.accountRepository.save([sourceAccount, targetAccount]);

    await this.transactionRepository.save({
      type: TransactionType.TRANSFER,
      amount,
      sourceAccount: { id: sourceAccountId },
      targetAccount: { id: targetAccountId }
    });
  }
}