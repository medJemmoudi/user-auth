import { Controller, Get, Post, Req, Res, Next, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { authenticate } from 'passport';
import { LoginUserDto } from './dto/login.dto';
import { LoginUser } from './decorators/login.decorator';
import { User } from '../entity/user.entity';
import { SignupUser } from './decorators/signup.decorator';
import { SignupUserDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(private readonly jwtService: JwtService){}

    @Post('login')
    public async login(
        @LoginUser(new ValidationPipe) user: LoginUserDto,
        @Req() req: any, @Res() res: any, @Next() next: any 
    ) {
        authenticate('local-login', (err: any, user: User) => {
            if (err) {
                res.status(500).json(err);
            }
            
            req.logIn(user, (err: any) => {
                let payload = `${user.name}${user.id}`;
                const accessToken = this.jwtService.sign(payload);
                const responseData = {
                    access_token: accessToken,
                    expires_in: 3600,
                    user_id: payload,
                    payload: user
                };
                req.session.save(() => res.json(responseData));
            });
        })(req, res, next);
    }

    @Post('signup')
    public async signup(
        @SignupUser(new ValidationPipe) user: SignupUserDto,
        @Req() req: Request, @Res() res: Response, @Next() next: any
    ) {
        authenticate('local-signup', (err: any, user: User) => {
            if (err) {
                res.status(500).json(err);
            }

            /* 
             *  local-signup strategy will handle user creation
             *  using AuthService instance, then the user will be logged in
             */
            req.logIn(user, (err: any) => {
                let payload = `${user.name}${user.id}`;
                const accessToken = this.jwtService.sign(payload);
                const responseData = {
                    access_token: accessToken,
                    expires_in: 3600,
                    user_id: payload,
                    payload: user
                };
                req.session.save(() => res.json(responseData));
            });
        })(req, res, next);
    }

    @Get('logout')
    public async logout(@Req() req: any, @Res() res: any) {
        req.session.destroy(() => res.json(true));
    }
}
