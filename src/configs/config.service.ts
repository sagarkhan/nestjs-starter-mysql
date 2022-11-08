import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export class ConfigService {
  private envConfig: Record<string, string | undefined>;
  constructor() {
    this.envConfig = process.env || {};
  }

  public get(key: string): string {
    return this.envConfig[key] || '';
  }

  public getPortConfig() {
    return this.get('PORT');
  }

  public getDatabaseConfigs(): MysqlConnectionOptions {
    return {
      // TODO
      type: 'postgres' as 'mysql',
      host: this.get('DB_HOST'),
      port: Number(this.get('DB_PORT')),
      username: this.get('DB_USERNAME'),
      password: this.get('DB_PASSWORD'),
      database: this.get('DB_NAME'),
      synchronize: false,
    };
  }
}
