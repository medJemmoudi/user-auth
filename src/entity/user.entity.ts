import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('varchar')
	name: string;

	@Column('varchar')
	@Exclude()
	password: string;

	@Column('varchar', { unique: true })
	email: string

	@Column('varchar')
	phone: string
}