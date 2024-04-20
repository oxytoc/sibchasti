import { DataSource, DataSourceOptions } from "typeorm";

export const ConnectionSource: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  // disable in production
  synchronize: true,
};

const dataSource = new DataSource(ConnectionSource);
export default dataSource;
