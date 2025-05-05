import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Account } from '../../account/entities/account.entity';
  
  export enum TransactionType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAW = 'WITHDRAW',
    TRANSFER = 'TRANSFER',
  }
  
  @Entity()
  export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'enum', enum: TransactionType })
    type: TransactionType;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;
  
    @ManyToOne(() => Account)
    @JoinColumn({ name: 'source_account_id' })
    sourceAccount?: Account;
  
    @ManyToOne(() => Account, { nullable: true })
    @JoinColumn({ name: 'target_account_id' })
    targetAccount?: Account;
  
    @CreateDateColumn()
    created_at: Date;
  }
  