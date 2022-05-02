import React from "react";
import { TODOListItem } from "../../interfaces/todo";

interface IProps {
    todo: TODOListItem;
}

class TodoItemAtom extends React.Component<IProps> {
    render(): React.ReactNode {
        const { todo } = this.props;

        return <div data-testid="todo-item-atom" className="todo-item-atom">
            <div className="tia-name">{todo.name} ({todo.status ? 'Done' : 'Not Done'})</div>
        </div>
    }
}

export default TodoItemAtom;