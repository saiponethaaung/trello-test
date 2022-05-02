import { gql } from "@apollo/client";

export const GET_TODO_LIST = gql`
{
	todoList{
    id,
    name,
    todos{id,name, todo_list_id, order, status}
  }
}
`
