import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  name: string;

  @Column({nullable:true})
  description: string;

  @Column({default : '' , nullable : true})
  time: string;

  @Column({nullable:true})
  logo: string;

  @Column({nullable:true})
  photo: string;
}
