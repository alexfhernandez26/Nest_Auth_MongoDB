import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { GetUser } from './decorators/get-user.decorator';
import { Auth } from './auth.decorator';
import { VALID_ROLE } from './interfaces/user-role.interface';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
 
  @Get('private')
  @UseGuards(AuthGuard())
  privateRoute(
    @GetUser() user: User,
  ){
    return{
      ok:true,
      message:'hola desde private',
      user
    }
  }

  @Get('private2')
  @Auth(VALID_ROLE.admin,VALID_ROLE.user)
  privateRoute2(
    @GetUser() user: User,
  ){
    return{
      ok:true,
      message:'hola desde private',
      user
    }
  }
}
