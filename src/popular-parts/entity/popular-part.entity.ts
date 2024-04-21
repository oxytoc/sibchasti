import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class PopularPart {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({
    type: 'json',
    nullable: true,
  })
    errors: number[];
  
  @Column({
    type: 'json',
    nullable: true,
  })
    timeSeries: number[];

  @Column({
    type: 'json',
    nullable: true,
  })
    predicts: number[];
}