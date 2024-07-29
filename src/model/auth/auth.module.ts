import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

export const jwtSecret = 'JneJWTSecret';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '15m' }, // e.g. 30s, 7d, 24h
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
