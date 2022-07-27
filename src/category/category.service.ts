import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Category } from '@prisma/client';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) { }

  create(createCategoryDto: CreateCategoryDto) {
    try {
      return this.prisma.category.create({

        data: { ...createCategoryDto },

      });
    } catch (e) {
      throw new InternalServerErrorException("Error creating category");
    }
  }

  async findAll() {
    try {
      const categories: Category[] = await this.prisma.category.findMany({});
      return instanceToPlain(plainToInstance(
        CreateCategoryDto,
        categories,
        {
          ignoreDecorators: false
        },
      ),
      );
    } catch (e) {
      throw new InternalServerErrorException("Error finding categories");
    }
  }

  findOne(id: string) {
    try {

      return this.prisma.category.findFirst({
        where: {
          id: id
        }
      })
    } catch (e) {
      throw new InternalServerErrorException("Error finding category");
    }
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {

      return this.prisma.category.update({
        data: {
          ...updateCategoryDto
        },
        where: {
          id: id
        }
      })
    } catch (e) {
      throw new InternalServerErrorException("Error updating category");
    }
  }

  remove(id: string) {
    try {

      return this.prisma.category.delete({
        where: {
          id: id
        }
      })
    } catch (e) {
      throw new InternalServerErrorException("Error deleting category");
    }
  }
}
