import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class Country {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	code: string;

	@Field()
	@Column()
	name: string;

	@Field()
	@Column()
	emoji: string;

	@Field()
	@Column()
	continentCode: string;

	constructor(
		code: string,
		name: string,
		emoji: string,
		continentCode: string,
	) {
		this.code = code;
		this.name = name;
		this.emoji = emoji;
		this.continentCode = continentCode;
	}
}
