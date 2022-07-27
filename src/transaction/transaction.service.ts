import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Type } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) { }
  create(createTransactionDto: CreateTransactionDto) {
    try {
      return this.prisma.transaction.create({

        data: {
          ...createTransactionDto,
          type: createTransactionDto.type.toLowerCase() == 'income' ? Type.INCOME : Type.SPENT,

          date: new Date(createTransactionDto.date).toISOString(),
          categoryId: createTransactionDto.categoryId,
          personId: createTransactionDto.personId,
          id: undefined

        }

      })
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    try {
      return this.prisma.transaction.findMany({
        include: {
          Category: true
        }
      });

    } catch (e) {
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

  async findWeekly(date: string) {
    //Validate date
    if (!date || date.length != 10) {
      throw new BadRequestException();
    }

    //Get first and last day of the week
    let fromDate;
    let toDate;
    try {
      fromDate = new Date(date);
    } catch (e) {
      throw new BadRequestException();
    }
    toDate = new Date(fromDate.getTime() + 24 * 60 * 60 * 1000 * 6);

    //Get transactions
    let transactions: Transaction[];
    try {
      transactions = await this.prisma.transaction.findMany({
        where: {
          date: {
            gte: fromDate,
            lte: toDate
          }
        },
        orderBy: {
          date: 'asc'
        },

      });
    } catch (e) {
      throw new InternalServerErrorException();
    }
    //If no transactions return empty array
    if (!transactions) {
      return [];
    }

    //initialize array
    let filteredWeekDaySpents = [];

    //Initialize array with days of the week
    let weekDays = [];

    let currentDate: Date = new Date(fromDate.getTime());

    //Fill weekDays array with days of the week
    while (currentDate.getTime() <= toDate.getTime()) {
      weekDays.push(currentDate.toLocaleDateString('en-US', { weekday: 'long' }));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    //Fill filteredWeekDaySpents array with days of the week and 0 as value
    weekDays.forEach((e) => {
      filteredWeekDaySpents.push({ "weekDay": e, "values": [] });
    });

    currentDate = new Date(fromDate.getTime());

    //Fill filteredWeekDaySpents array with days of the week and values
    while (currentDate.getTime() <= toDate.getTime()) {
      transactions.forEach((e) => {
        const elementData: Date = new Date(e.date);
        const currentDateTimeBinary: Date = new Date(currentDate.getTime());
        if (elementData.getTime() >= currentDateTimeBinary.getTime() && elementData.getTime() <= currentDateTimeBinary.getTime()) {
          filteredWeekDaySpents.forEach((element) => {
            if (element.weekDay == currentDate.toLocaleDateString('en-US', { weekday: 'long' })) {
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

  async findMonthly(date: string) {
    if (!date || date.length != 10) {
      throw new BadRequestException();
    }
    let fromDate: Date;
    let toDate;
    try {
      fromDate = new Date(date);
    } catch (e) {
      throw new BadRequestException();
    }
    toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);
    let transactions: Transaction[];
    try {
      transactions = await this.prisma.transaction.findMany({
        where: {
          date: {
            gte: fromDate,
            lte: toDate
          }
        },
        orderBy: {
          date: 'asc'
        },

      });
    } catch (e) {
      throw new InternalServerErrorException();
    }
    let filteredMonthDaySpents = [];
    for (let i = 1; i <= toDate.getDate(); i++) {
      filteredMonthDaySpents.push({ "day": i, "values": [] });
    }
    transactions.forEach((e) => {
      filteredMonthDaySpents[new Date(e.date).getDate()].values.push(e);
    })
    return filteredMonthDaySpents;
  }
  async findYearly(date: string) {
    if (!date || date.length != 10) {
      throw new BadRequestException();
    }
    let fromDate;
    let toDate;
  }
}

