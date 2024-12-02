import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./data-source";
import { CountryResolver } from "./resolvers/CountryResolver";
import { Country } from "./entities/Country";

const startServeur = async () => {

	const countriesData = [
    { code: "FR", name: "France", emoji: "🇫🇷", continentCode: "EU" },
    { code: "BE", name: "Belgium", emoji: "🇧🇪", continentCode: "EU" },
    { code: "DE", name: "Germany", emoji: "🇩🇪", continentCode: "EU" },
    { code: "IT", name: "Italy", emoji: "🇮🇹", continentCode: "EU" },
    { code: "ES", name: "Spain", emoji: "🇪🇸", continentCode: "EU" },
    { code: "US", name: "United States", emoji: "🇺🇸", continentCode: "NA" },
    { code: "CA", name: "Canada", emoji: "🇨🇦", continentCode: "NA" },
    { code: "GB", name: "United Kingdom", emoji: "🇬🇧", continentCode: "EU" },
    { code: "JP", name: "Japan", emoji: "🇯🇵", continentCode: "AS" },
    { code: "IN", name: "India", emoji: "🇮🇳", continentCode: "AS" },
    { code: "CN", name: "China", emoji: "🇨🇳", continentCode: "AS" },
    { code: "AU", name: "Australia", emoji: "🇦🇺", continentCode: "OC" },
    { code: "MX", name: "Mexico", emoji: "🇲🇽", continentCode: "NA" },
    { code: "BR", name: "Brazil", emoji: "🇧🇷", continentCode: "SA" },
    { code: "AR", name: "Argentina", emoji: "🇦🇷", continentCode: "SA" },
    { code: "CO", name: "Colombia", emoji: "🇨🇴", continentCode: "SA" },
    { code: "VE", name: "Venezuela", emoji: "🇻🇪", continentCode: "SA" },
    { code: "EG", name: "Egypt", emoji: "🇪🇬", continentCode: "AF" },
    { code: "NG", name: "Nigeria", emoji: "🇳🇬", continentCode: "AF" },
    { code: "ZA", name: "South Africa", emoji: "🇿🇦", continentCode: "AF" },
    { code: "RU", name: "Russia", emoji: "🇷🇺", continentCode: "EU" },
    { code: "SA", name: "Saudi Arabia", emoji: "🇸🇦", continentCode: "AS" },
    { code: "KR", name: "South Korea", emoji: "🇰🇷", continentCode: "AS" },
    { code: "NG", name: "Nigeria", emoji: "🇳🇬", continentCode: "AF" },
    { code: "KE", name: "Kenya", emoji: "🇰🇪", continentCode: "AF" },
    { code: "SG", name: "Singapore", emoji: "🇸🇬", continentCode: "AS" },
    { code: "TH", name: "Thailand", emoji: "🇹🇭", continentCode: "AS" },
    { code: "FI", name: "Finland", emoji: "🇫🇮", continentCode: "EU" },
    { code: "PL", name: "Poland", emoji: "🇵🇱", continentCode: "EU" }
  ];

	await AppDataSource.initialize();

	await AppDataSource.getRepository(Country).clear();
	await AppDataSource.getRepository(Country).save(countriesData.map((data) => AppDataSource.getRepository(Country).create(data)));
	console.log("Countries data added successfully!");

	const schema = await buildSchema({
		resolvers: [CountryResolver],
	});

	const server = new ApolloServer({
		schema,
	});

	const { url } = await startStandaloneServer(server, {
		listen: { port: 4000 },
	});

	console.log(`Server is running on ${url}`);
};

startServeur().catch((err) => console.error(err));
