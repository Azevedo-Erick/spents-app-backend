import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PersonModule } from 'src/person/person.module';
import { AuthService } from './auth.service';

@Module({
  imports:[PersonModule, PassportModule, JwtModule.registerAsync({
    imports:[ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      privateKey: configService.get('JWT_PRIVATE_KEY'),
      signOptions:{
        expiresIn: '60s'
      }
    }),
    inject: [ConfigService]
  })],
  providers: [AuthService],
  exports:[AuthService],
})
export class AuthModule {}
