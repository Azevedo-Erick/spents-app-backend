import { Exclude, Expose } from "class-transformer";
import { Category } from "../entities/category.entity";

export class CreateCategoryDto extends Category {
    @Exclude({
        toPlainOnly: true
    })
    id?: string;

    @Exclude()
    createdAt?: string | Date;
    @Exclude()
    updatedAt?: string | Date;


    @Expose()
    get Id(): string {
        return this.id;
    }

}
