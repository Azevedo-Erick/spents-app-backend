import { Prisma } from "@prisma/client";
import { IsEmail, IsNotEmpty } from "class-validator";

export class Person implements Prisma.PersonUncheckedCreateInput {
    id?: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    
    password: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}
