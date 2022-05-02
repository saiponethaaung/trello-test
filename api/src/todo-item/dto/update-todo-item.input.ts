import { CreateTodoItemInput } from './create-todo-item.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTodoItemInput extends PartialType(CreateTodoItemInput) {
  @Field(() => Int, { description: 'Task id' })
  id: number;

  @Field(() => String, { description: 'Task name' })
  name: String;
}
