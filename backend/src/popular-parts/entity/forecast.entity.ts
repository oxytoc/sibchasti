import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PartIdWithDemands } from "../forecasts.service";


@Entity()
export class Forecast {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    period: number;

  @Column({
    type: 'json',
    nullable: true,
  })
    forecast: PartIdWithDemands[];
}