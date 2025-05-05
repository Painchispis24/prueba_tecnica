import { Controller, Get, Post, Body, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiTags('accounts')
@ApiBearerAuth()
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Crear una nueva cuenta bancaria' })
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'Listar todas las cuentas bancarias' })
  findAll() {
    return this.accountService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: 'Consultar una cuenta por su ID' })
  async findOne(@Param('id') id: string) {
    const account = await this.accountService.findOne(+id);

    if (!account) {
      throw new NotFoundException(`Cuenta con ID ${id} no encontrada`);
    }

    return account;
  }

  @UseGuards(AuthGuard('jwt'))
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
