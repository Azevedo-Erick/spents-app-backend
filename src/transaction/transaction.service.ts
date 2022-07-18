import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Type } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

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
}
