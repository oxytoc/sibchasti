import { CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Client } from "src/client-manager/entity/client.entity";
import { PartQuantity } from "./part-quantity.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
    id: number;

  @CreateDateColumn()
    orderDate: string;

  @ManyToOne(() => Client, (client: Client) => client.orders, { eager: true })
    client: Client;

  @JoinTable()
  @ManyToMany(() => PartQuantity, (partQuantity: PartQuantity) => partQuantity.orders, { cascade: true, eager: true })
    partQuantities: PartQuantity[];
}