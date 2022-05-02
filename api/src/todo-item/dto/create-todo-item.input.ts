import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateTodoItemInput {
  @Field(() => String, { description: 'Task name' })
  name: String;

  @Field(() => Int, { description: 'Todo list id' })
  todo_list_id: number;
}
