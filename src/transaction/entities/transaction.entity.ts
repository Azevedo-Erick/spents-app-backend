import { Prisma, Type } from "@prisma/client";
import { IsNotEmpty, IsNumber } from "class-validator";

export class Transaction implements Prisma.TransactionUncheckedCreateInput{
    id?: string;
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    data: string | Date;
    @IsNumber()
    value: number;
    description: string;
    @IsNotEmpty()
    type: Type;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    @IsNotEmpty()
    personId: string;
    @IsNotEmpty()
    categoryId?: string;
}
