import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'example' })
export class Example extends BaseEntity {
  @Column('text')
  first_name: string;

  @Column('text')
  last_name: string;

  // @Column('text', { nullable: true })
  // migration_test: string;
}
