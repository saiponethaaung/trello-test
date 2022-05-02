import { CreateTodoListInput } from './create-todo-list.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTodoListInput extends PartialType(CreateTodoListInput) {
  @Field(() => Int)
  id: number;
}
