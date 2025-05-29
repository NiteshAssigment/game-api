import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  platform: string;

  @Column('float')
  score: number;

  @Column()
  genre: string;

  @Column({ name: 'editors_choice', default: 'N' })
  editorsChoice: string;
}
