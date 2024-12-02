import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: "src/data-checkpoint/database.sqlite",
	synchronize: true,
	logging: true,
	entities: ["src/entities/*.ts"],
});
