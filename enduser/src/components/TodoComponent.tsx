import { WithApolloClient } from "@apollo/client/react/hoc";
import React from "react";
import { connect } from "react-redux";
import client from "../configuration/apollo";
import { CREATE_TODO_LIST } from "../interfaces/mutation";
import { GET_TODO_LIST } from "../interfaces/query";
import { TODOList, TODOState } from "../interfaces/todo";
import { UpdateTODOListFunction, updateTODOListFunction } from "../redux/actions/todo.action";
import { StoreState } from "../redux/reducers";
import InputAtom from "./atoms/InputAtom";
import TodoListOrganism from "./organisms/TodoListOraganism";

interface IProps extends WithApolloClient<any> {
    todoState: TODOState;
    updateTODOListFunction: UpdateTODOListFunction;
}

interface IStates {
}

class TodoComponent extends React.Component<IProps, IStates> {
    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks = () => {
        // const client = this.props.client as ApolloClient<any>;

        client.query({
            query: GET_TODO_LIST,
        }).then((res: any) => {
            this.props.updateTODOListFunction(JSON.parse(JSON.stringify(res.data.todoList)));
        })
    }

    createCard = (title: string) => {
        client.mutate({
            mutation: CREATE_TODO_LIST(title),
        }).then((res: any) => {
            const { todoList } = this.props.todoState;

            todoList.push({
                id: res.data.createTodoList.id,
                name: title,
                todos: [],
            });

            this.props.updateTODOListFunction(todoList);
        }).catch((err) => {
            if (err.networkError) {
                alert(err.networkError.result.errors[0].message);
            } else {
                console.log(err.message)
            }
        });
    }

    updateTODO = (index: number, value: TODOList): void => {
        const { todoList } = this.props.todoState;

        todoList[index] = value;

        this.props.updateTODOListFunction(todoList);
    }

    render() {
        const { todoList } = this.props.todoState;

        return <div data-testid="todo-component" className="todo-component">
            <h1 className="tc-heading">TODO App</h1>
            <div className="tc-list">
                {todoList.map((_, index) => <TodoListOrganism
                    key={index}
                    index={index}
                    update={(data: TODOList): void => this.updateTODO(index, data)}
                    {...this.props}
                />)}

                <div className="tc-content">
                    <div className="tc-content-con">
                        <div className="tc-input no-margin">
                            <InputAtom enterEvent={this.createCard} placeholder="Enter a card name and hit enter" />
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default connect(({ todoState }: StoreState) => {
    return { todoState };
}, { updateTODOListFunction })(TodoComponent);