import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as MySQLStore from 'express-mysql-session';

const port = process.env.PORT || 8080;

async function bootstrap() {
  // Nest Application
  const app: INestApplication = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(require('helmet')());
  app.use(require('compression')());
  app.use(require('cookie-parser')());
  app.use(require('body-parser').urlencoded({ extended: true }));
  app.use(require('body-parser').json());

  const options = {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  };

  const sessionStore = new MySQLStore(options);
 
  app.use(session({
      key: 'md_jemmoudi_cookie',
      secret: 'md_jemmoudi_secret',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
  }));

  // enable passport session
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, obj));
  
  // Starting the server
  await app.listen(port);
  Logger.log(`server started & listening on port: ${port}`, 'Bootstrap');
}

bootstrap();
