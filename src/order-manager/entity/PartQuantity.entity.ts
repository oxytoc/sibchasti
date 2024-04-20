import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Part } from "src/parts-manager/entity/part.entity";
import { Order } from "./order.entity";

@Entity()
export class PartQuantity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    quantity: number;
  
  @ManyToOne(() => Part, (part: Part) => part.PartQuantities, { eager: true })
    part: Part;

  @ManyToMany(() => Order, (order: Order) => order.partQuantities)
    orders: Order;
}