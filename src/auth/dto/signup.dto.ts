import {
	IsNotEmpty,
	IsEmail,
	MinLength
} from 'class-validator';

export class SignupUserDto {
	@IsNotEmpty()
	readonly name: string;

	@IsEmail()
	readonly email: string;

	@IsNotEmpty()
	readonly phone: string;

	@MinLength(4, { message: 'You must enter more than 4 characters' })
	readonly password: string;
}