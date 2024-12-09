import { DataSource, DataSourceOptions } from "typeorm";

export const ConnectionSource: DataSourceOptions = {
  type: 'postgres',
  // db for docker, localhost for dev
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  // disable in production
  synchronize: false,
};

const dataSource = new DataSource(ConnectionSource);
export default dataSource;
