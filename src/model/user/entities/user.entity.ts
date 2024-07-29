import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
    type: 'varchar',
  })
  username: string;

  @Exclude()
  @Column({
    type: 'varchar',
  })
  password: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}