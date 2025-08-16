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
  
  @Column({ default: '', nullable: true })
  date: string;

  @Column({nullable:true})
  logo: {name:string; src:string}

  @Column({nullable:true})
  photos: [{ name: string; src: string }];


}
