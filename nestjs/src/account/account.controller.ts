import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('accounts')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva cuenta bancaria' })
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las cuentas bancarias' })
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar una cuenta por su ID' })
  async findOne(@Param('id') id: string) {
    const account = await this.accountService.findOne(+id);

    if (!account) {
      throw new NotFoundException(`Cuenta con ID ${id} no encontrada`);
    }

    return account;
  }

  @Get(':id/balance')
  @ApiOperation({ summary: 'Obtener el saldo disponible de una cuenta' })
  @ApiParam({ name: 'id', type: Number })
  async getBalance(@Param('id') id: string) {
    const balance = await this.accountService.getBalance(+id);
    if (balance === null) {
      throw new NotFoundException(`Cuenta con ID ${id} no encontrada`);
    }
    return { id: +id, balance };
  }
}
