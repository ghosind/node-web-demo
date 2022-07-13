import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Store {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
    name: string;

  @CreateDateColumn()
    createdAt: Date;
}
