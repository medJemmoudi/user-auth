import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalSignupStrategy } from './strategies/local.signup.strategy';
import { LocalLoginStrategy } from './strategies/local.login.strategy';

@Module({
  imports: [
  	UsersModule
  ],
  providers: [
  	AuthService,
  	LocalSignupStrategy,
    LocalLoginStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
