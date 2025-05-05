import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsInt,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateTransactionDto {
  
    @ApiProperty()
    @IsNumber()
    @IsPositive()
    amount: number;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    sourceAccountId?: number;
  
    @ApiProperty()
    @IsOptional()
    @IsInt()
    targetAccountId?: number;
  }
  