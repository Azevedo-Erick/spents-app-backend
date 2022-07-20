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
          
          data:new Date(createTransactionDto.data).toISOString(),
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
    toDate = new Date(fromDate.getTime() + 24 * 60 * 60 * 1000 * 6);
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
    if(!transactions){
      return [];
    }
    let filteredWeekDaySpents = [];

    let weekDays = [];
    let currentDate:Date = new Date(fromDate.getTime());
    while(currentDate.getTime() <= toDate.getTime()){
      weekDays.push(currentDate.toLocaleDateString('en-US', { weekday: 'long' }));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    weekDays.forEach((e)=>{
      filteredWeekDaySpents.push({"weekDay":e, "values":[]});
    });
      
    currentDate = new Date(fromDate.getTime());

    while(currentDate.getTime() <= toDate.getTime()){
      transactions.forEach((e)=>{
        const elementData:Date = new Date(e.data);
        const currentDateTimeBinary:Date = new Date(currentDate.getTime());
        if(elementData.getTime() >= currentDateTimeBinary.getTime() && elementData.getTime() <= currentDateTimeBinary.getTime()){
          filteredWeekDaySpents.forEach((element)=>{
            if(element.weekDay == currentDate.toLocaleDateString('en-US', { weekday: 'long' })){
              element.values.push(e);
            }
          }
          );
        }
      })
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return filteredWeekDaySpents;
      
   
    


    
  }

}

