/* eslint-disable no-console */
import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { migrationTest1667930889139 } from './migrations/1667930889139-migration-test';

const getConnectionConfigs = ({
  host,
  username,
  password,
  database,
}): MysqlConnectionOptions => {
  return {
    type: 'mysql',
    host,
    username,
    password,
    database,
    synchronize: false,
    logging: true,
    migrations: [migrationTest1667930889139],
    entities: ['./src/database/entities/*.entity{.ts,.js}'],
  };
};

export const executeMigrations = async () => {
  const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

  const connectionConfigs: MysqlConnectionOptions = getConnectionConfigs({
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  });

  console.log('Connecting to database');

  const connection = new DataSource(connectionConfigs);

  await connection.initialize();

  console.log(
    `Connection established to ${connectionConfigs.database}@${connectionConfigs.host}`,
  );

  console.log('Starting Migrations process');

  await connection.runMigrations({
    transaction: 'all',
  });

  console.log('Migrations executed');

  await connection.close();
};

executeMigrations()
  .then(() => {
    console.log('Migrations OK');
  })
  .catch((err) => {
    console.error('Migrations Failed', err);
    process.exit(1);
  });
