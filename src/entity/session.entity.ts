import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Session {
	@PrimaryColumn({ type: 'varchar', collation: 'utf8_general_ci' })
	sid: string;

	@Column('json')
	sess: string;

	@Column('timestamp')
	expire: number;
}