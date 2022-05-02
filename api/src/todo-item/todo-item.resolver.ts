import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoItemService } from './todo-item.service';
import { TodoItem } from './entities/todo-item.entity';
import { CreateTodoItemInput } from './dto/create-todo-item.input';
import { UpdateTodoItemInput } from './dto/update-todo-item.input';
import { UpdateTodoItemOrderInput } from './dto/update-todo-item-order.input';
import { UpdateTodoItemStatusInput } from './dto/update-todo-item-status.input';

@Resolver(() => TodoItem)
export class TodoItemResolver {
  constructor(private readonly todoService: TodoItemService) { }

  @Mutation(() => TodoItem)
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoItemInput) {
    return this.todoService.create(createTodoInput);
  }

  @Query(() => [TodoItem], { name: 'todos' })
  findAll(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.findAll(id);
  }

  @Query(() => TodoItem, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.findOne(id);
  }

  @Mutation(() => TodoItem)
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoItemInput) {
    return this.todoService.update(updateTodoInput.id, updateTodoInput);
  }

  @Mutation(() => String)
  updateTodoOrder(@Args('updateTodoOrderInput') updateTodoOrderInput: UpdateTodoItemOrderInput) {
    return this.todoService.updateOrder(updateTodoOrderInput);
  }

  @Mutation(() => String)
  updateTodoStatus(@Args('updateTodoItemStatusInput') updateTodoItemStatusInput: UpdateTodoItemStatusInput) {
    return this.todoService.updateStatus(updateTodoItemStatusInput);
  }

  @Mutation(() => String)
  removeTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.remove(id);
  }
}
