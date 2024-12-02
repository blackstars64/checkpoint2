import { InputType, Field } from "type-graphql";

@InputType()
export class CountryInput {
	@Field()
	code: string;

	@Field()
	name: string;

	@Field()
	emoji: string;

	@Field()
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
