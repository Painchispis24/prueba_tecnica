import { Controller, Get, Post, Body, ParseIntPipe , Param, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiTags('Transactions')
@ApiBearerAuth()
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/deposit')
  @ApiOperation({ summary: 'Realiza un deposito' })
  deposit(@Body() dto: CreateTransactionDto) {
    return this.transactionService.deposit(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/withdraw')
  @ApiOperation({ summary: 'Realiza un retiro' })
  withdraw(@Body() dto: CreateTransactionDto) {
    return this.transactionService.withdraw(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/transfer')
  @ApiOperation({ summary: 'Realiza una transferencia' })
  transfer(@Body() dto: CreateTransactionDto) {
    return this.transactionService.transfer(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':accountId')
  @ApiOperation({ summary: 'Lista transacciones de una cuenta' })
  findByAccountId(@Param('accountId', ParseIntPipe) id: number) {
    return this.transactionService.findByAccountId(id);
  }
}
