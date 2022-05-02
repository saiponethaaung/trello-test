import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateTodoItemInput } from './dto/create-todo-item.input';
import { UpdateTodoItemOrderInput } from './dto/update-todo-item-order.input';
import { UpdateTodoItemStatusInput } from './dto/update-todo-item-status.input';
import { UpdateTodoItemInput } from './dto/update-todo-item.input';
import { TodoItem } from './entities/todo-item.entity';

@Injectable()
export class TodoItemService {
  constructor(
    @InjectRepository(TodoItem) private readonly todoRepo: Repository<TodoItem>,
  ) { }

  async create(createTodoInput: CreateTodoItemInput): Promise<TodoItem> {
    const createTodo = await this.todoRepo.save({ ...createTodoInput, order: 1 } as TodoItem);

    const todoItems = await this.todoRepo.find({
      where: {
        "todo_list_id": createTodo.todo_list_id,
        "id": Not(createTodo.id),
      },
      order: {
        'order': "ASC",
      }
    });

    let order = 2;

    for (let i of todoItems) {
      i.order = order++;
      await this.todoRepo.update(i.id, i);
    }

    return createTodo;
  }

  findAll(todoListID: number) {
    return this.todoRepo.find({ where: { todo_list_id: todoListID }, order: { order: "ASC" } });
  }

  findOne(id: number) {
    return this.todoRepo.findOne(id);
  }

  async update(id: number, updateTodoInput: UpdateTodoItemInput): Promise<TodoItem> {
    const updateTodo = await this.todoRepo.save(updateTodoInput as TodoItem);
    return updateTodo;
  }

  async updateOrder(input: UpdateTodoItemOrderInput): Promise<String> {
    let order = 1;

    for (let i of input.id) {
      await this.todoRepo.update(i, { order: order++, todo_list_id: input.todo_list_id });
    }

    return "Success";
  }

  async updateStatus(input: UpdateTodoItemStatusInput): Promise<String> {
    await this.todoRepo.update(input.id, { status: input.status });

    return "Success";
  }

  async remove(id: number): Promise<string> {
    const item = await this.todoRepo.findOne(id);
    await this.todoRepo.delete({ id });

    const todoItems = await this.todoRepo.find({
      where: {
        "todo_list_id": item.todo_list_id,
      },
      order: {
        'order': "ASC",
      }
    });

    let order = 1;

    for (let i of todoItems) {
      i.order = order++;
      await this.todoRepo.update(i.id, i);
    }


    return `Task(${id}) is removed!`;
  }
}
