import { Prisma } from "@prisma/client";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import patterns from "src/helpers/regex-patterns.helper";

export class Person implements Prisma.PersonUncheckedCreateInput {
    id?: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @Matches(patterns.password, { message: "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number and one special character" })
    password: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}
