import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: 'cookie',
            secretOrKey: process.env.JWT_SECRET_KEY,
            passReqToCallback: true,
        });
    }

    async validate(payload){
        return {email: payload.email,password: payload.password};
    }
}