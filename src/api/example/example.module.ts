import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Example } from '../../database/entities/example.entity';
import { ExampleController } from './controllers/example.controller';
import { ExampleCoreService } from './services/example.core.service';
import { ExampleService } from './services/example.service';

@Module({
  imports: [TypeOrmModule.forFeature([Example])],
  controllers: [ExampleController],
  providers: [ExampleCoreService, ExampleService],
  exports: [ExampleCoreService],
})
export class ExampleModule {}
