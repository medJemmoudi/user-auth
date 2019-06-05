import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessToken } from '../auth/decorators/token.decorator';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	@Get()
	async findAll(@AccessToken() token: string) {
		const users = await this.usersService.findAll();
		return users;
	}
}
