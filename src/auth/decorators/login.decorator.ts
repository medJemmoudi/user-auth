import { createParamDecorator } from '@nestjs/common';
import { LoginUserDto } from './dto/login.dto';

export const LoginUser = createParamDecorator(
	(data, req) => {
		const { email, password } = req.body;
		return { email, password } as LoginUserDto;
	}
);