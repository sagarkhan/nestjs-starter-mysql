import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../configs/config.module';
import { ConfigService } from '../configs/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          ...config.getDatabaseConfigs(),
          entities: [__dirname + '/entities/*.entity{.ts,.js}'],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
