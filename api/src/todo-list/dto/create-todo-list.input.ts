import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoListInput {
  @Field(() => String, { description: 'List name' })
  name: String;
}
