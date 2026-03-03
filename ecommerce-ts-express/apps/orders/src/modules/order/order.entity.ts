import { Currency, OrderStatus } from '@repo/contracts'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { OrderItemEntity } from '../order-item/order-item.entity.js'

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'user_id', type: 'text' })
  userId!: string

  @Column({ type: 'text' })
  status!: OrderStatus

  @Column({ type: 'char', length: 3, default: 'RUB' })
  currency!: Currency

  @OneToMany(() => OrderItemEntity, (i) => i.order, { cascade: ['insert'] })
  items!: OrderItemEntity[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
