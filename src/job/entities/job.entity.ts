import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('jobs')
export class JobOffer {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  externalId: string;

  @Column()
  title: string;

  @Column()
  location: string;

  @Column()
  type: string;

  @Column()
  company: string;

  @Column()
  industry: string;

  @Column({ nullable: true })
  salaryMin?: number;

  @Column({ nullable: true })
  salaryMax?: number;

  @Column({ nullable: true })
  currency?: string;

  @Column('text', { array: true })
  skills: string[];

  @Column({ type: 'timestamp' })
  postedDate: Date;
}
