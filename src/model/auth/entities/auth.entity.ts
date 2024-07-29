import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/model/user/entities/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('Auth')
export class Auth {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  accessToken: string;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  employee: User;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}