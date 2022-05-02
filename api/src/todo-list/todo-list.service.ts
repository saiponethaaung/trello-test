import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoListInput } from './dto/create-todo-list.input';
import { UpdateTodoListInput } from './dto/update-todo-list.input';
import { TodoList } from './entities/todo-list.entity';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TodoList) private readonly todoRepo: Repository<TodoList>,
  ) { }

  async create(createTodoListInput: CreateTodoListInput) {
    const createTodo = await this.todoRepo.save(createTodoListInput as TodoList);
    return createTodo;
  }

  findAll() {
    return this.todoRepo.find({ order: { order: 'ASC' } });
  }

  findOne(id: number) {
    return `This action returns a #${id} todoList`;
  }

  update(id: number, updateTodoListInput: UpdateTodoListInput) {
    return `This action updates a #${id} todoList`;
  }

  remove(id: number) {
    return `This action removes a #${id} todoList`;
  }
}
