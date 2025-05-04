import { IsNotEmpty, IsString, IsIn, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  holder_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  document_number: string;

  @ApiProperty({ enum: ['DEBIT', 'CREDIT'] })
  @IsNotEmpty()
  @IsIn(['DEBIT', 'CREDIT'])
  account_type: string;

  @IsOptional()
  @IsNumber()
  balance?: number;
}

