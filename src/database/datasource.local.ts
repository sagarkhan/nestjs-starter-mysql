import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'root',
  database: 'test',
  synchronize: false,
  logging: true,
  entities: ['src/database/entities/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
});

dataSource.initialize();

export default dataSource;
