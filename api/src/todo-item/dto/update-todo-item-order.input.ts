import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTodoItemOrderInput {
  @Field(() => [Int], { description: 'Task id' })
  id: number[];

  @Field(() => Int, { description: 'List id' })
  todo_list_id: number;
}
