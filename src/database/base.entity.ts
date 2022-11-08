import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column()
  @CreateDateColumn()
  created_at?: Date;

  @Column('integer')
  created_by: number;

  @Column()
  @UpdateDateColumn()
  updated_at?: Date;

  @Column('integer', { nullable: true })
  updated_by?: number;

  @Column({ nullable: true })
  deleted_at?: Date;

  @Column('integer', { nullable: true })
  deleted_by?: number;
}
