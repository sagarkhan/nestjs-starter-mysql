import { Injectable } from '@nestjs/common';
import { ExampleEntity } from 'src/database/entities/example.entity';

@Injectable()
export class ExampleService {
  private readonly examples: ExampleEntity[] = [];

  create(example: ExampleEntity) {
    this.examples.push(example);
  }

  findAll(): ExampleEntity[] {
    return this.examples;
  }
}
