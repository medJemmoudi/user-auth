import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UsersService } from '../users/users.service';
import { SignupUserDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService
	){}

	public async checkUser(email: string): Promise<User> {
		return await this.usersService.findByEmail(email);
	}

	public async registerUser(data: SignupUserDto): Promise<User> {
		let _user: User = await this.checkUser(data.email);
		if (_user)
			return _user;

		const { name, email, phone, password } = data;
		_user = await this.usersService.create({ name, email, phone, password });
		return await this.usersService.save(_user);
	}
}
