import { Controller, Get, Post, Req, Res, Next, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { authenticate } from 'passport';
import { LoginUserDto } from './dto/login.dto';
import { LoginUser } from './decorators/login.decorator';
import { User } from '../entity/user.entity';
import { SignupUser } from './decorators/signup.decorator';
import { SignupUserDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {

    @Post('login')
    public async login(
        @LoginUser(new ValidationPipe()) user: LoginUserDto,
        @Req() req: any, @Res() res: any, @Next() next: any 
    ) {
        authenticate('local-login', (err: any, user: User) => {
            req.logIn(user, (err: any) => {
                req.session.save(() => res.json(req.user));
            });
        })(req, res, next);
    }

    @Post('signup')
    public async signup(
        @SignupUser(new ValidationPipe()) user: SignupUserDto,
        @Req() req: any, @Res() res: any, @Next() next: any
    ) {
        authenticate('local-signup', (err: any, user: User) => {
            /* 
             *  local-signup strategy will handle user creation
             *  using AuthService instance, then the user will be logged in
             */
            req.logIn(user, (err: any) => {
                req.session.save(() => res.json(req.user));
            });
        })(req, res, next);
    }

    @Get('logout')
    public async logout(@Req() req: any, @Res() res: any) {
        req.session.destroy(() => res.json(true));
    }
}
