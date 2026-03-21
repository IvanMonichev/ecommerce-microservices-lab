import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { OrderEntity } from '../order/order.entity.js'

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  // Связь с заказом
  @ManyToOne(() => OrderEntity, (order) => order.items, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'order_id' })
  order!: OrderEntity

  @Column({ name: 'order_id', type: 'uuid' })
  orderId!: string

  @Column({ name: 'product_id', type: 'text' })
  productId!: string

  @Column({ type: 'int' })
  quantity!: number
}
