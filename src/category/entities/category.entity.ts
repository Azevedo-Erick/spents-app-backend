import { Prisma } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class Category implements Prisma.CategoryUncheckedCreateInput{
    id?: string;
    @IsNotEmpty()
    name: string;
    transaction?: Prisma.TransactionUncheckedCreateNestedManyWithoutCategoryInput;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}
