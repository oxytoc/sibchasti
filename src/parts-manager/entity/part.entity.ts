import { PartQuantity } from "src/order-manager/entity/part-quantity.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity() //sql table === 'part'
export class Part {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    brand: string;

  @Column()
    name: string;

  @Column()
    quantity: number;

  @Column()
    partCode: number;

  @Column()
    vin: string;

  @Column()
    type: string;

  @Column()
    price: number;
  
  @OneToMany(() => PartQuantity, (partQuantity: PartQuantity) => partQuantity.part)
    partQuantities: PartQuantity[];
}