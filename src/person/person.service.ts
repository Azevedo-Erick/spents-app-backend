import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { hashSync } from 'bcrypt';
@Injectable()
export class PersonService {
  constructor(private readonly prisma: PrismaService) { }
  create(createPersonDto: CreatePersonDto) {
    createPersonDto.password = hashSync(createPersonDto.password, 10);
    try {
      return this.prisma.person.create({
        data: {
          ...createPersonDto
        }
      })
    } catch (e) {
      throw new InternalServerErrorException({ message: 'Error creating person' });
    }
  }

  findAll() {
    try {
      return this.prisma.person.findMany();
    } catch (e) {
      throw new InternalServerErrorException({ message: 'Error finding all persons' });
    }
  }

  findOne(id: string) {
    try {
      this.prisma.person.findFirst({
        where: {
          id: id
        }
      })
    } catch (e) {
      throw new InternalServerErrorException({ message: 'Error finding one person' });
    }
  }

  update(id: string, updatePersonDto: UpdatePersonDto) {
    try {
      this.prisma.person.update({
        data: {
          ...updatePersonDto
        },
        where: {
          id: id
        }
      })
    } catch (e) {
      throw new InternalServerErrorException({ message: 'Error updating person' });
    }
  }

  remove(id: string) {
    try {
      this.prisma.person.delete({
        where: {
          id: id
        }
      })
    } catch (e) {
      throw new InternalServerErrorException({ message: 'Error removing person' });
    }
  }
  findByEmail(email:string){
    try{
      return this.prisma.person.findFirst({
        where:{
          email:email
        }
      })
    }catch(e){
      return undefined;
    }
  }
}
