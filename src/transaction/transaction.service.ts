import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Type } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTransactionDto: CreateTransactionDto) {
    try{
      return this.prisma.transaction.create({

        data: {
          ...createTransactionDto,
          type: createTransactionDto.type.toLowerCase() == 'income' ? Type.INCOME : Type.SPENT,
          
          categoryId: createTransactionDto.categoryId,
          personId: createTransactionDto.personId,
          id: undefined
        }
      })
    }catch(e){
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    try{
      return this.prisma.transaction.findMany({
        include:{
          Category:true
        }
      });

    }catch(e){
      throw new InternalServerErrorException();
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  async findBetweenDates(date: string) {
    
    if(!date || date.length != 10){
      throw new BadRequestException();
    }
    
    let fromDate;
    let toDate;
    try{
      fromDate = new Date(date);
    }catch(e){
      throw new BadRequestException();
    }
    toDate = new Date(fromDate.getTime() + 24 * 60 * 60 * 1000);
    let transactions:Transaction[] ;
    try{
      transactions = await this.prisma.transaction.findMany({
        where:{
          data: {
            gte: fromDate,
            lte: toDate
          }
        },
        orderBy:{
          data: 'asc'
        },
        
      });
    }catch(e){
      throw new InternalServerErrorException();
    }
     transactions.map(transaction => {
      const day =new Date(transaction.data);
      const weekDay = day.toLocaleDateString('en-US', { weekday: 'long' });
    }) 
    transactions.filter(transaction => {})
    //transactions.reduce((acc, curr) => {}, )
  }

}

