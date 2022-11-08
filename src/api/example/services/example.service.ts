import { Injectable, Logger } from '@nestjs/common';
import { Example } from 'src/database/entities/example.entity';
import { CreateExampleDto } from '../dtos/create-example.dto';
import { ExampleCoreService } from './example.core.service';

@Injectable()
export class ExampleService {
  private logger: Logger;

  constructor(private readonly exampleCoreService: ExampleCoreService) {
    this.logger = new Logger('ExampleService');
  }
}
