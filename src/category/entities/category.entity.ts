import { Prisma } from "@prisma/client";
import { Exclude } from "class-transformer";
import { IsHexColor, IsNotEmpty } from "class-validator";

export class Category implements Prisma.CategoryUncheckedCreateInput{
    id?: string;
    @IsNotEmpty()
    @IsHexColor()
    color: string;
    @IsNotEmpty()
    name: string;
    transaction?: Prisma.TransactionUncheckedCreateNestedManyWithoutCategoryInput;
    createdAt?: string | Date;
    updatedAt?: string | Date;

   
}
