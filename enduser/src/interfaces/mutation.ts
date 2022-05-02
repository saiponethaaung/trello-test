import { gql } from "@apollo/client";

export const CREATE_TODO_LIST = (task: string) => gql`
mutation {
    createTodoList(
        createTodoListInput:{
             name: "${task}"
        }
    ){id}
}
`

export const CREATE_TODO = (task: string, todoListID: number) => gql`
mutation {
    createTodo(
        createTodoInput: {
            name: "${task}"
            todo_list_id: ${todoListID}
        }
    ){id}
}
`

export const UPDATE_TODO = (id: number, task: string) => gql`
mutation {
    updateTodo(
        updateTodoInput: {
            id: ${id},
            name: "${task}"
        }
    ){id}
}
`


export const DELETE_TODO = (id: number) => gql`
mutation {
    removeTodo(id: ${id})
}
`

export const UPDATE_TODO_ORDER = (id: number[], todoListID: number) => gql`
mutation {
    updateTodoOrder(
       updateTodoOrderInput:{
            id: [${id.join(",")}],
            todo_list_id: ${todoListID}
        }
    )
}
`

export const UPDATE_TODO_STATUS = (id: number, status: number) => gql`
mutation {
    updateTodoStatus(
        updateTodoItemStatusInput:{
            id: ${id},
            status: ${status}
        }
    )
}
`