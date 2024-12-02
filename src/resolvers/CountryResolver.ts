import { AppDataSource } from "../data-source";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import type { Repository } from "typeorm";

import { Country } from "../entities/Country";
import { CountryInput } from "../inputs/ContryInput";

@Resolver(Country)
export class CountryResolver {
  private db: Repository<Country>;

  constructor() {
    this.db = AppDataSource.getRepository(Country);
  }

  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return this.db.find();
  }

  @Query(() => Country, { nullable: true })
  async country(@Arg("code") code: string): Promise<Country | null> {
    return await this.db.findOneBy({ code });
  }

  @Query(() => [Country])
  async countriesByContinent(
    @Arg("continentCode") continentCode: string
  ): Promise<Country[]> {
    return await this.db.findBy({ continentCode });
  }

  @Mutation(() => Country)
  async addCountry(@Arg("data") data: CountryInput): Promise<Country> {
    const country = this.db.create({ ...data });
    return await this.db.save(country);
  }
}
