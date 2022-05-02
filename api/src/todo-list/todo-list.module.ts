import { Module } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { TodoListResolver } from './todo-list.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from './entities/todo-list.entity';
import { TodoItemModule } from 'src/todo-item/todo-item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoList]),
    TodoItemModule
  ],
  providers: [TodoListResolver, TodoListService]
})
export class TodoListModule { }
