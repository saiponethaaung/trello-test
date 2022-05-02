import React from "react";
import { connect } from "react-redux";
import client from "../../configuration/apollo";
import { UPDATE_TODO_ORDER, UPDATE_TODO_STATUS } from "../../interfaces/mutation";
import { TODOListItem, TODOState } from "../../interfaces/todo";
import { UpdateDragContentFunction, updateDragContentFunction, UpdateTODOListFunction, updateTODOListFunction } from "../../redux/actions/todo.action";
import { StoreState } from "../../redux/reducers";
import InputAtom from "../atoms/InputAtom";
import TodoItemAtom from "../atoms/TodoItemAtom";

interface IProps {
    todoState: TODOState;
    listIndex: number;
    itemIndex: number;
    todo: TODOListItem;
    deleteEvent?(): void;
    updateEvent?(value: string): void;
    updateDragContentFunction: UpdateDragContentFunction;
    updateTODOListFunction: UpdateTODOListFunction;
}

interface IState {
    edit: boolean;
    name: string;
    dragEnter: boolean;
    dragging: boolean;
    child: any;
}

class TodoItemMolecule extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            edit: false,
            name: props.todo.name,
            dragEnter: false,
            dragging: false,
            child: null,
        };
    }

    deleteEvent = () => {
        if (window.confirm("Are you sure you want to delete?")) {
            if (this.props.deleteEvent) {
                this.props.deleteEvent();
            }
        }
    }

    updateEvent = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (this.props.updateEvent) {
            this.props.updateEvent(this.state.name);
        }
    }

    toggleEdit = () => {
        let { edit, name } = this.state;
        let newName = name;

        if (edit) {
            newName = this.props.todo.name;
        }

        this.setState({
            edit: !edit,
            name: newName,
        });
    }

    dragEnter = (e: any) => {
        this.props.updateDragContentFunction({
            id: this.props.itemIndex,
            listID: this.props.listIndex,
        });
        this.setState({
            dragEnter: true,
        });
    }

    dragLeave = (e: any) => {
        this.setState({
            dragEnter: false,
        });
    }

    dropEvent = (e: any) => {
        console.log('drop event', e);
    }

    dragEnd = (e: any) => {
        e.preventDefault();
        this.setState({
            dragging: false,
        })

        const { todoState, itemIndex, listIndex } = this.props;
        const { dragContent, todoList } = todoState;

        if (dragContent.listID !== listIndex) {
            const items = todoList[listIndex].todos.splice(itemIndex, 1);

            todoList[dragContent.listID].todos = [
                ...todoList[dragContent.listID].todos.slice(0, dragContent.id),
                ...items,
                ...todoList[dragContent.listID].todos.slice(dragContent.id),
            ]

            client.mutate({
                mutation: UPDATE_TODO_ORDER(todoList[dragContent.listID].todos.map(t => t.id), todoList[dragContent.listID].id),
            }).catch((err) => {
                if (err.networkError) {
                    alert(err.networkError.result.errors[0].message);
                } else {
                    console.log(err.message)
                }
            });

        } else {
            const items = todoList[listIndex].todos.splice(itemIndex, 1);
            let index = dragContent.id;

            if (dragContent.id > index) {
                index--;
            }

            todoList[listIndex].todos.splice(index, 0, ...items);

        }

        client.mutate({
            mutation: UPDATE_TODO_ORDER(todoList[listIndex].todos.map(t => t.id), todoList[listIndex].id),
        }).catch((err) => {
            if (err.networkError) {
                alert(err.networkError.result.errors[0].message);
            } else {
                console.log(err.message)
            }
        });

        this.props.updateTODOListFunction(todoList);

        this.props.updateDragContentFunction({
            id: 0,
            listID: 0,
        });
    }

    updateStatus = () => {
        const { todo, todoState, itemIndex, listIndex } = this.props;
        
        client.mutate({
            mutation: UPDATE_TODO_STATUS(todo.id, todo.status ? 0 : 1),
        }).then(() => {
            todoState.todoList[listIndex].todos[itemIndex].status = todo.status ? 0 : 1;
            this.props.updateTODOListFunction(todoState.todoList);
        }).catch((err) => {
            if (err.networkError) {
                alert(err.networkError.result.errors[0].message);
            } else {
                console.log(err.message)
            }
        });
    }

    render(): React.ReactNode {
        const { todo } = this.props;
        const { edit, dragEnter, dragging } = this.state;

        return <li
            onDrop={this.dropEvent}
            onDragOver={this.dragEnter}
            onDragLeave={this.dragLeave}
        >
            <div className={`tlo-list-item ghost ${dragEnter ? 'show' : ''}`}>
                <div data-testid="todo-item-molecule" className="todo-item-molecule">
                    <TodoItemAtom todo={{
                        id: 0,
                        name: '',
                        status: 0
                    }} />
                </div>
            </div>

            <div className={`tlo-list-item ${todo.id} ${dragEnter ? 'dragover' : ''}`}>
                <div data-testid="todo-item-molecule" className="todo-item-molecule">
                    {edit &&
                        <form className="tim-edit-form" onSubmit={this.updateEvent}>
                            <label>
                                <InputAtom initialValue={todo.name} updateValue={(v) => this.setState({
                                    name: v
                                })} />
                            </label>
                            <div className="tim-action-buttons">
                                <button className="btn danger" type="button"
                                    onClick={this.toggleEdit}
                                >Cancel</button>
                                <button className="btn success" type="submit">Update</button>
                            </div>
                        </form>
                    }
                    {!edit &&
                        <div
                            draggable={true}
                            onDragStart={() => {
                                this.setState({
                                    dragging: true,
                                })
                            }}
                            onDragEnd={this.dragEnd}
                        >
                            <TodoItemAtom todo={todo} />
                            {!dragging &&
                                <>
                                    <div className="tim-edit-action tim-action-buttons">
                                        <button className="btn primary" type="button"
                                            onClick={this.toggleEdit}
                                        >Edit</button>
                                        <button className="btn danger" type="button"
                                            onClick={this.deleteEvent}
                                        >Delete</button>
                                        <button className="status-btn btn success" onClick={this.updateStatus} type="button">{todo.status ? "Mark Undone" : "Mark Done"}</button>
                                    </div>
                                </>
                            }
                        </div>
                    }
                </div>
            </div>
        </li >
    }
}

export default connect(({ todoState }: StoreState) => {
    return { todoState };
}, {
    updateDragContentFunction,
    updateTODOListFunction,
})(TodoItemMolecule);