import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Role } from "src/roles/role.enum";
import { Order } from "src/order-manager/entity/order.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 15 })
    username: string;
  
    @Column({ type: 'varchar', length: 40 })
    email: string;
  
    @Column({ type: 'int' })
    age: number;
  
    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar', length: 30 })
    firstName: string;

    @Column({ type: 'varchar', length: 30 })
    secondName: string;

    @Column({ type: 'varchar', length: 30 })
    thirdName: string;

    @Column({ type: 'varchar', length: 11 })
    phoneNumber: string;
  
    @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
    /**
     * m - male
     * f - female
     * u - unspecified
     */
    gender: string;

    @Column({ type: 'enum', enum: Object.values(Role) })
    role: Role;

    @OneToMany(() => Order, (order: Order) => order.client)
    orders: Order[];
}
