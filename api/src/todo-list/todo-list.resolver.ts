import { Resolver, Query, Mutation, Args, Int, ResolveProperty } from '@nestjs/graphql';
import { TodoListService } from './todo-list.service';
import { TodoList } from './entities/todo-list.entity';
import { CreateTodoListInput } from './dto/create-todo-list.input';
import { UpdateTodoListInput } from './dto/update-todo-list.input';
import { TodoItemService } from 'src/todo-item/todo-item.service';
import { TodoItem } from 'src/todo-item/entities/todo-item.entity';

@Resolver(() => TodoList)
export class TodoListResolver {
  constructor(
    private readonly todoListService: TodoListService,
    private readonly todoItemService: TodoItemService,
  ) { }

  @Mutation(() => TodoList)
  createTodoList(@Args('createTodoListInput') createTodoListInput: CreateTodoListInput) {
    return this.todoListService.create(createTodoListInput);
  }

  @Query(() => [TodoList], { name: 'todoList' })
  findAll() {
    return this.todoListService.findAll();
  }

  @Mutation(() => TodoList)
  updateTodoList(@Args('updateTodoListInput') updateTodoListInput: UpdateTodoListInput) {
    return this.todoListService.update(updateTodoListInput.id, updateTodoListInput);
  }

  @ResolveProperty('todos', type => [TodoItem])
  getItems(obj: TodoList) {
    return this.todoItemService.findAll(obj.id);
  }

  @Mutation(() => TodoList)
  removeTodoList(@Args('id', { type: () => Int }) id: number) {
    return this.todoListService.remove(id);
  }
}
