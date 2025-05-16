import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DateWithForecast, PeriodWithForecast } from "../forecasts.service";


@Entity()
export class Forecast {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    partId: number;

  @Column()
    partName: string;

  @Column({
    type: 'json',
    nullable: true,
  })
    forecasts: DateWithForecast[];
}