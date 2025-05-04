import { Controller, Get, Post, Body, ParseIntPipe , Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('/deposit')
  @ApiOperation({ summary: 'Realiza un deposito' })
  deposit(@Body() dto: CreateTransactionDto) {
    return this.transactionService.deposit(dto);
  }

  @Post('/withdraw')
  @ApiOperation({ summary: 'Realiza un retiro' })
  withdraw(@Body() dto: CreateTransactionDto) {
    return this.transactionService.withdraw(dto);
  }

  @Post('/transfer')
  @ApiOperation({ summary: 'Realiza una transferencia' })
  transfer(@Body() dto: CreateTransactionDto) {
    return this.transactionService.transfer(dto);
  }

  @Get(':accountId')
  @ApiOperation({ summary: 'Lista transacciones de una cuenta' })
  findByAccountId(@Param('accountId', ParseIntPipe) id: number) {
    return this.transactionService.findByAccountId(id);
  }
}
