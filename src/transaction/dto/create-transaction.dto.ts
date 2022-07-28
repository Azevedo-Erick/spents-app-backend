import { Exclude } from "class-transformer";
import { Transaction } from "../entities/transaction.entity";

export class CreateTransactionDto extends Transaction {
    @Exclude()
    createdAt?: string | Date;
    @Exclude()
    updatedAt?: string | Date;
}
