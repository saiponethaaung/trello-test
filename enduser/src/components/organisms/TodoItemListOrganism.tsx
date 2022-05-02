import React from "react";
import { TODOListItem, TODOState } from "../../interfaces/todo";
import TodoItemMolecule from "../molecules/TodoItemMolecule";
import { UpdateTODOListFunction, updateTODOListFunction } from "../../redux/actions/todo.action";
import { StoreState } from "../../redux/reducers";
import { connect } from "react-redux";
import { DELETE_TODO, UPDATE_TODO } from "../../interfaces/mutation";
import client from "../../configuration/apollo";

interface IProps {
    listIndex: number;
    todoState: TODOState;
    updateTODOListFunction: UpdateTODOListFunction;
}

interface IStates {

}

class TodoItemListOrganism extends React.Component<IProps, IStates> {
    deleteEvent = (index: number): void => {
        const { todoList } = this.props.todoState;
        const list = this.props.todoState.todoList[this.props.listIndex];

        client.mutate({
            mutation: DELETE_TODO(list.todos[index].id)
        }).then((res: any) => {
            list.todos.splice(index, 1);
            todoList[this.props.listIndex].todos = list.todos;

            this.props.updateTODOListFunction(todoList);
        }).catch((err) => {
            if (err.networkError) {
                alert(err.networkError.result.errors[0].message);
            } else {
                console.log(err.message)
            }
        });
    }

    updateEvent = (index: number, value: string): void => {
        const { todoList } = this.props.todoState;
        const list = this.props.todoState.todoList[this.props.listIndex];

        if (list.todos[index].name === value) return;

        client.mutate({
            mutation: UPDATE_TODO(list.todos[index].id, value),
        }).then(() => {
            list.todos[index].name = value;
            todoList[this.props.listIndex].todos = list.todos;

            this.props.updateTODOListFunction(todoList);
        }).catch((err) => {
            if (err.networkError) {
                alert(err.networkError.result.errors[0].message);
            } else {
                console.log(err.message)
            }
        });
    }

    render(): React.ReactNode {
        const { todos } = this.props.todoState.todoList[this.props.listIndex];
        return <div className="todo-list-organism">
            <ul className="tlo-list" >
                {todos.map((todo, i) => {
                    return <TodoItemMolecule
                        key={JSON.stringify(todo)}
                        listIndex={this.props.listIndex}
                        itemIndex={i}
                        todo={todo}
                        deleteEvent={() => this.deleteEvent(i)}
                        updateEvent={(v) => this.updateEvent(i, v)}
                    />
                })}
            </ul>
        </div>;
    }
}

export default connect(({ todoState }: StoreState) => {
    return { todoState };
}, { updateTODOListFunction })(TodoItemListOrganism); 