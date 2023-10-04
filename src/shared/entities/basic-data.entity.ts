import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BasicData {
  @Column({ nullable: true, default: true })
  active?: boolean;

  @Column({ nullable: true, default: false })
  deleted?: boolean;

  @CreateDateColumn({ type: 'datetime' })
  createdAt?: Date;

  @Column({ nullable: true })
  createdBy?: string;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt?: Date;

  @Column({ nullable: true })
  updatedBy?: string;
}
