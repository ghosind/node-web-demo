import {
  Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn,
} from 'typeorm';

import { ColumnNumericTransformer } from '../util';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
  @Index()
    storeId: string;

  @Column({
    type: 'decimal',
    precision: 18,
    scale: 15,
    transformer: new ColumnNumericTransformer(),
  })
    amount: number;

  @CreateDateColumn()
    createdAt: Date;
}
