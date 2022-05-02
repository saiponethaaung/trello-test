import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TodoList } from 'src/todo-list/entities/todo-list.entity';
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('todo_item')
export class TodoItem {
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

  @ManyToOne(type => TodoList, null, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'todo_list_id' })
  todoList: TodoList;

  @Field(() => Int)
  @Column({ name: 'todo_list_id' })
  todo_list_id: number;

  @Field(() => Int)
  @Column({ name: 'status', default: 0 })
  status: number;
}
