import { Injectable, Logger } from '@nestjs/common';
import { ExampleCoreService } from './example.core.service';

@Injectable()
export class ExampleService {
  private logger: Logger;

  constructor(private readonly exampleCoreService: ExampleCoreService) {
    this.logger = new Logger('ExampleService');
  }
}
