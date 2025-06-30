import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  REGULAR = 'regular',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.REGULAR,
  })
  role: UserRole;

  @Column({ nullable: true, length: 100 })
  first_name: string;

  @Column({ nullable: true, length: 100 })
  last_name: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  //   @OneToMany(() => Document, document => document.user)
  //   documents: Document[];
}
