import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PersonModule, CategoryModule, TransactionModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
