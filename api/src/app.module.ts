import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoItemModule } from './todo-item/todo-item.module';
import { TodoListModule } from './todo-list/todo-list.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot(),
    TodoItemModule,
    TodoListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
