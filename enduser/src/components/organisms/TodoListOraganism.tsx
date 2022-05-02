import { WithApolloClient } from "@apollo/client/react/hoc";
import React from "react";
import { connect } from "react-redux";
import client from "../../configuration/apollo";
import { CREATE_TODO } from "../../interfaces/mutation";
import { TODOState } from "../../interfaces/todo";
import { UpdateTODOListFunction, updateTODOListFunction } from "../../redux/actions/todo.action";
import { StoreState } from "../../redux/reducers";
import InputAtom from "../atoms/InputAtom";
import TodoItemMolecule from "../molecules/TodoItemMolecule";
import TodoItemListOrganism from "./TodoItemListOrganism";


interface IProps extends WithApolloClient<any> {
    index: number;
    todoState: TODOState;
    updateTODOListFunction: UpdateTODOListFunction;
}

interface IStates {

}

class TodoListOrganism extends React.Component<IProps, IStates> {
    createTask = (task: string) => {
        const { todoState, index } = this.props;

        client.mutate({
            mutation: CREATE_TODO(task, todoState.todoList[index].id),
        }).then((res: any) => {
            todoState.todoList[index].todos.unshift({
                id: res.data.createTodo.id,
                name: task,
                status: 0,
            });

            this.props.updateTODOListFunction(todoState.todoList);
        }).catch((err) => {
            if (err.networkError) {
                alert(err.networkError.result.errors[0].message);
            } else {
                console.log(err.message)
            }
        });
    }

    render() {
        const todosList = this.props.todoState.todoList[this.props.index];

        return <div className="tc-content">
            <div className="tc-card-name">{todosList.name}</div>
            <div className="tc-content-con">
                <div className="tc-item-list">
                    <TodoItemListOrganism
                        listIndex={this.props.index}
                    />
                </div>
                <div className="tc-input">
                    <InputAtom enterEvent={this.createTask} placeholder="Enter a task name and hit enter" />
                </div>
            </div>
        </div>;
    }
}

export default connect(({ todoState }: StoreState) => {
    return { todoState };
}, { updateTODOListFunction })(TodoListOrganism);