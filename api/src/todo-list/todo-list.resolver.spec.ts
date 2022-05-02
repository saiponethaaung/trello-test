import { Test, TestingModule } from '@nestjs/testing';
import { TodoListResolver } from './todo-list.resolver';
import { TodoListService } from './todo-list.service';

describe('TodoListResolver', () => {
  let resolver: TodoListResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoListResolver, TodoListService],
    }).compile();

    resolver = module.get<TodoListResolver>(TodoListResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
