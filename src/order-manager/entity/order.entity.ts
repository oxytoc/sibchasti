import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Client } from "src/client-manager/entity/client.entity";
import { PartQuantity } from "./PartQuantity.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    orderDate: string;

  @ManyToOne(() => Client, (client: Client) => client.orders, { eager: true })
    client: Client;

  @JoinTable()
  @ManyToMany(() => PartQuantity, (partQuantity: PartQuantity) => partQuantity.orders, { cascade: true, eager: true })
    partQuantities: PartQuantity[];
}