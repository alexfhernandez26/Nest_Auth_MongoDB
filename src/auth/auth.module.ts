import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [
    
    MongooseModule.forFeature([{name:User.name, schema: UserSchema  }]),
    ConfigModule,
  
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
     useFactory :(configService: ConfigService) => {
         return {
          secret:configService.get("JWT_SECRET"),
          signOptions:{
            expiresIn:'1h',
          }
         }
     },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[PassportModule,JwtStrategy,JwtModule]
})
export class AuthModule {}
