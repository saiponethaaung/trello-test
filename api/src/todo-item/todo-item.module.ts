import { Module } from '@nestjs/common';
import { TodoItemService } from './todo-item.service';
import { TodoItemResolver } from './todo-item.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItem } from './entities/todo-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoItem]),
  ],
  providers: [TodoItemResolver, TodoItemService],
  exports: [TodoItemService],
})
export class TodoItemModule { }
