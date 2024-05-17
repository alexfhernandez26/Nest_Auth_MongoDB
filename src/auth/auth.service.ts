import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { json } from 'stream/consumers';
import * as bcript from "bcrypt";
import {CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ){}
  async create(createUserDto: CreateUserDto) {
    try {
      const {password, ...userData} = createUserDto;
      const user = new this.userModel({
        ...userData,
        password: bcript.hashSync(password,10)
      })
      await user.save();
      return {
        email: user.email,
        token : this.getJwtToken({_id:user._id})
      }
      //TODO: Retornar JWT

    } catch (error) {
      this.handleDbError(error);
    }
  }

  async login(loginUserDto: LoginUserDto){
    try {
      const {email,password} = loginUserDto;
      const user = await this.userModel.findOne(
        {email},
      ).select('_id email password ')

      if(!user)
        throw new UnauthorizedException('Credential are not valid(email)')

      if(!bcript.compareSync(password,user.password))
        throw new UnauthorizedException('Credential are not valid(password)')

      return {
        email: user.email,
        token : this.getJwtToken({_id:user._id})
      }
      //TODO: JWT
    } catch (error) {
      this.handleDbError(error)
    }
    
  }
  
  private getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload)
    return token;
  }
  private handleDbError(error:any)
  {
    if(error.code ===11000)
    {
      throw new BadRequestException(`Email alrready exist${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException('Error, please check logs')
  }
  
}
