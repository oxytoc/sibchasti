import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Client } from "src/client-manager/entity/client.entity";
import { Part } from "src/parts-manager/entity/part.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    orderDate: string;

  @ManyToOne(() => Client, (client: Client) => client.orders)
    client: Client;
  
  @ManyToMany(() => Part)
  @JoinTable()
    parts: Part[];
}