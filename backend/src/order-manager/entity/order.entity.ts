import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { PartQuantity } from "./part-quantity.entity";
import { User } from "src/user/entities/user.entity";

export enum OrderStatus {
  open = 'open',
  closed = 'closed'
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'enum', enum: ['open', 'closed'] })
    orderStatus: OrderStatus;

  @CreateDateColumn()
    orderDate: string;

  @ManyToOne(() => User, (client: User) => client.orders, { eager: true })
  @JoinColumn({ name: 'user_id' })
    client: User;

  @JoinTable()
  @ManyToMany(() => PartQuantity, (partQuantity: PartQuantity) => partQuantity.orders, { cascade: true, eager: true })
    partQuantities: PartQuantity[];
}