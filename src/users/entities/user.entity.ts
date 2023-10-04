import { ApiProperty } from '@nestjs/swagger';
import { BasicData } from '../../shared/entities/basic-data.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BasicData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column()
  confirmationToken: string;

  @Column()
  confirmed: string;

  @Column()
  resetPasswordToken: string;
}
