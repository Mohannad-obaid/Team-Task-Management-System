import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  team_id: number;

  @Column({ nullable: false, unique: true })
  team_name: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  created_by: User;

  @CreateDateColumn()
  created_at: Date;
}
