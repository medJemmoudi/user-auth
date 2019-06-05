import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../entity/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
  	TypeOrmModule.forFeature([User]), 
  	JwtModule.register({ secret: process.env.JWT_SECRET })
  ],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService]
})
export class UsersModule {}
