import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Account } from '../account/entities/account.entity';
import { TransactionType } from '../transaction/entities/transaction.entity';

@Injectable()
export class TransactionService {

  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,

    @InjectRepository(Account)
    private accountRepo: Repository<Account>,
  ) {}

  async deposit(dto: CreateTransactionDto): Promise<Transaction>{
    const { amount, sourceAccountId  } = dto;

    const source = await this.accountRepo.findOneBy({ id: sourceAccountId  });
    if (!source) throw new NotFoundException('Cuenta no encontrada');

    source.balance = Number(source.balance) + Number(amount);

    await this.accountRepo.save(source);

    return this.transactionRepo.save({ type:TransactionType.DEPOSIT, amount, sourceAccount: source });
  }

  async withdraw(dto: CreateTransactionDto): Promise<Transaction>{
    const { amount, sourceAccountId  } = dto;

    const source = await this.accountRepo.findOneBy({ id: sourceAccountId  });
    if (!source) throw new NotFoundException('Cuenta no encontrada');
    if (source.balance < amount) throw new BadRequestException('Saldo insuficiente');

    source.balance = Number(source.balance) - Number(amount);
    await this.accountRepo.save(source);

    return this.transactionRepo.save({ type: TransactionType.WITHDRAW, amount, sourceAccount: source });
  }

  async transfer(dto: CreateTransactionDto): Promise<Transaction>{
    const {  amount, sourceAccountId, targetAccountId } = dto;

    const source = await this.accountRepo.findOneBy({ id: sourceAccountId });
    const target = await this.accountRepo.findOneBy({ id: targetAccountId });
      
    if (!source || !target) throw new NotFoundException('Cuenta no encontrada');
    if (source.balance < amount) throw new BadRequestException('Saldo insuficiente');

    source.balance = Number(source.balance) - Number(amount);
    target.balance = Number(target.balance) + Number(target);

    await this.accountRepo.save([source, target]);

    return this.transactionRepo.save({ type:TransactionType.TRANSFER, amount, sourceAccount: source, targetAccount: target });
  }

  async findByAccountId(accountId: number): Promise<Transaction[]> {
    return this.transactionRepo.find({
      where: [
        { sourceAccount: { id: accountId } },
      ],
      order: { created_at: 'DESC' },
    });
  }
}
