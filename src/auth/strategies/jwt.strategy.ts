import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../entities/user.entity";
import { Model } from "mongoose";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(User.name)
        private readonly userRepository: Model<User>,
        confiService:ConfigService
        
    ){


        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey: confiService.get('JWT_SECRET')
        })
    }

    async validate(payload: JwtPayload) : Promise<User> {
       const {_id} = payload;
       const user = await this.userRepository.findOne({_id}).exec();
       if(!user)
        throw new UnauthorizedException('invalid token')
       if(!user.isActive)
        throw new UnauthorizedException('invalid token, user is no active')

        return user;
      }
}