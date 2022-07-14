import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PersonModule, CategoryModule, TransactionModule, PrismaModule, AuthModule,],
  controllers: [AppController],
  providers: [JwtService],
})
export class AppModule {}
