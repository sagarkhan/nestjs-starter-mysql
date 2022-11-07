import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'example' })
export class ExampleEntity extends BaseEntity {
  @Column('text')
  first_name: string;

  @Column('text')
  last_name: number;
}
