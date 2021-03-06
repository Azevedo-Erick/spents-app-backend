import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
  //Year/Month/Day
  @Get('weekly/:date')
  @UseInterceptors(ClassSerializerInterceptor)
  findBetweenDates(@Param('date') date: string) {

    return this.transactionService.findWeekly(date);
  }
  //Year/Month/Day
  @Get('monthly/:date')
  findMonthly(@Param('date') date: string) {
    return this.transactionService.findMonthly(date);
  }
  //Year/Month/Day
  @Get('yearly/:date')
  findYearly(@Param('date') date: string) {
    return this.transactionService.findYearly(date);
  }


}
