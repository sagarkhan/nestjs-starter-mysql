import { Module } from '@nestjs/common';
import { ExampleModule } from './api/example/example.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, ExampleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
