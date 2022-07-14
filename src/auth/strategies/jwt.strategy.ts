import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'y58kXVOT4a8r5QtpS0LtRI9yO5ZtHeQh3VJwcnhYqOAbXgQ7wy0zkcWPmBm6GWsphgsgCC7EAbKJgY0xRqWzzg==',
            ignoreExpiration:false
        });
    }

    async validate(payload){
        return {email: payload.email,password: payload.password};
    }
}