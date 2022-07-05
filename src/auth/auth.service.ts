import { Injectable } from '@nestjs/common';
import { PersonService } from 'src/person/person.service';
import {compareSync} from 'bcrypt';
import { Person } from 'src/person/entities/person.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private readonly personService: PersonService, private readonly jwtService:JwtService) {}

    async validatePerson(email:string, password:string){
        const person:Person = await this.personService.findByEmail(email);
        if(
            compareSync(password, person.password)
            ){
            return person;
        }
        return null;
    }

    async login(user:Person){
        const payload = {email:user.email, password:user.password}
        return {
            acess_token:this.jwtService.sign(payload)
        }
    }
}
