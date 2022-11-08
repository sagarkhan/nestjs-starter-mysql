import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  // TODO
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: false,
  logging: true,
  entities: ['src/database/entities/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
});

dataSource.initialize();

export default dataSource;
