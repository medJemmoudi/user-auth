import { createParamDecorator } from '@nestjs/common';
import { SignupUserDto } from '../dto/signup.dto';

export const SignupUser = createParamDecorator(
	(data, req) => {
		const { name, email, password, phone } = req.body;
		return { name, email, password, phone } as SignupUserDto;
	}
);