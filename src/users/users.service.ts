import { hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly repository: Repository<User>
	) {}

	async findAll(): Promise<User[]> {
		return await this.repository.find();
	}

	async findByEmail(email: string): Promise<User> {
		return await this.repository.findOne({ email });
	}

	async findOne(id: number): Promise<User> {
		return await this.repository.findOne(id);
	}

	async create(data: CreateUserDto): Promise<User> {
		let { username, password, email } = data;
		password = await hash(password, 8);
		return await this.repository.create({ username, email, password });
	}

	async save(user: User): Promise<User> {
		return await this.repository.save(user);
	}

	async remove(user: User): Promise<void> {
		await this.repository.delete(user.id);
	}
}
