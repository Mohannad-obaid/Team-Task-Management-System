import { UserRole } from 'src/common/enums/user-roles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ select: false, nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GUEST, // يمكنك تحديد القيمة الافتراضية هنا
  })
  role: UserRole;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column({})
  @UpdateDateColumn() // تحديث العمود تلقائياً عند أي عملية تحديث للسجل
  updated_at: Date;
}
