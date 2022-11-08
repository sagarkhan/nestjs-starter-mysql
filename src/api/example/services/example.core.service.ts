/**
 * The class type CORE (*.core.service.ts) is used to export the basic & commonly used module functions from the module.
 * The idea is to export this class from the module so that other modules can use it as a DAO class.
 */

import { LoggerService } from '@fittr/logger';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Example } from '../../../database/entities/example.entity';

@Injectable()
export class ExampleCoreService {
  private logger: LoggerService;

  constructor(
    @InjectRepository(Example)
    private exampleRepository: Repository<Example>,
  ) {
    this.logger = new LoggerService('ExampleCoreService');
  }

  async findById(
    id: number,
    options: { required: boolean } = { required: false },
  ): Promise<Example | null> {
    const record = await this.exampleRepository.findOneBy({ id });
    if (options.required && !record) {
      this.logger.debug(
        'ExampleCoreService',
        `Example with id: ${id} not found`,
      );
      throw new NotFoundException('Example not found');
    }
    return record;
  }

  findAll() {
    return this.exampleRepository.find();
  }

  async create(exampleObj: Partial<Example>, created_by: number) {
    // apply validations here. e.g. uniqueness of columns for graceful error handling
    const exampleEntityInstance = this.exampleRepository.create({
      ...exampleObj,
      created_by,
    });
    return this.exampleRepository.save(exampleEntityInstance);
  }

  async updateById(
    id: number,
    updates: Partial<Example>,
    updated_by: number,
    options: { upsert: boolean } = { upsert: false },
  ) {
    await this.findById(id, { required: !options.upsert });
    return this.exampleRepository.update(id, {
      ...updates,
      updated_by,
    });
  }

  async deleteById(id: number, updates: { deleted_by: number }) {
    await this.findById(id, { required: true });
    return this.exampleRepository.update(id, {
      deleted_at: new Date(),
      ...updates,
    });
  }
}
