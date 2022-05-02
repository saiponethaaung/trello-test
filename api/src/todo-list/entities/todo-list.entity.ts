import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('todo_list')
export class TodoList {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Field(() => String, { description: 'Task name' })
  @Column()
  name: string;

  @Field(() => Int)
  @Column({ default: 0 })
  order: number;
}
