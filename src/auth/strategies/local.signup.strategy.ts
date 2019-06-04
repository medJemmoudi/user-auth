import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from "../auth.service";
import { User } from "../../entity/user.entity";

@Injectable()
export class LocalSignupStrategy extends PassportStrategy(Strategy, 'local-signup') {
    constructor(private readonly service: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        });
    }

    public async validate(req, email, password) {
        const { name, phone } = req.body;
        const user: User = await this.service.registerUser({ email, password, name, phone });
        if (user) {
            return user;
        }
        return false;
    }
}