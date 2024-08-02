import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
}

@Entity('User')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  kode_cabang: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  nama_cabang: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  username: string;

  @Exclude()
  @Column({
    type: 'varchar',
    select: false,
  })
  password: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}
