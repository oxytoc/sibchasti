import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Order } from "src/order-manager/entity/order.entity";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    firstName: string;

  @Column()
    secondName: string;

  @Column()
    thirdName: string;

  @Column()
    phoneNumber: string;
  
  @OneToMany(() => Order, (order: Order) => order.client)
    orders: Order[];
}