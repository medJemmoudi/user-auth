import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
  	TypeOrmModule.forRoot({
      type: process.env.DB_DRIVER,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [process.cwd() + '/dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  	UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
