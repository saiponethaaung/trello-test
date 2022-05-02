import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTodoItemStatusInput {
  @Field(() => Int , { description: 'Task id' })
  id: number;

  @Field(() => Int, { description: 'Status' })
  status: number;
}
