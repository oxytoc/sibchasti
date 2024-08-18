import { PartQuantity } from "src/order-manager/entity/part-quantity.entity";
import { DatabaseFile } from "src/shared/database-file/database-file.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @JoinColumn({ name: 'partImageId' })
  @OneToOne(
    () => DatabaseFile,
    {
      nullable: true
    }
  )
  partImage?: DatabaseFile;

  @Column({ nullable: true })
  partImageId?: number;
  
  @OneToMany(() => PartQuantity, (partQuantity: PartQuantity) => partQuantity.part)
    partQuantities: PartQuantity[];
}