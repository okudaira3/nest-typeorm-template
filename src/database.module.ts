import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entity/User';
import { Cat } from './cats/entities/cat.entity';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
const DATA_SOURCE = {};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'sqlite',
        database: 'database.sqlite',
        entities: [User, Cat],
        synchronize: false,
      }),
    }),
  ],
})
export class DatabaseModule {}

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: false,
  logging: false,
  entities: [User, Cat],
  migrations: [],
  subscribers: [],
});
