import {
	IsEmail,
	MinLength
} from 'class-validator';

export class LoginUserDto {
	@IsEmail()
	readonly email: string;

	@MinLength(4, { message: 'You must enter more than 4 characters' })
	readonly password: string;
}