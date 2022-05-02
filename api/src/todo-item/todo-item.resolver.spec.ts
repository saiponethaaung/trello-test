import { Test, TestingModule } from '@nestjs/testing';
import { TodoItemResolver } from './todo-item.resolver';
import { TodoItemService } from './todo-item.service';

describe('TodoResolver', () => {
  let resolver: TodoItemResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoItemResolver, TodoItemService],
    }).compile();

    resolver = module.get<TodoItemResolver>(TodoItemResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
