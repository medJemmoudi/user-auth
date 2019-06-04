import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('varchar')
	name: string;

	@Column('varchar')
	password: string;

	@Column('varchar', { unique: true })
	email: string

	@Column('varchar')
	phone: string
}