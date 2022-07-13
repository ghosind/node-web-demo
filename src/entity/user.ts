import {
  Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, Index,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({
    type: 'varchar',
    length: 256,
  })
  @Index('uk_email', { unique: true })
    email: string;

  @Column({
    type: 'varchar',
    length: 128,
  })
    password: string;

  @CreateDateColumn()
    createdAt: Date;
}
