export interface TODOList {
    id: number;
    name: string;
    todos: TODOListItem[];
}

export interface TODOListItem {
    id: number;
    name: string;
    status: number;
}

export interface TODOState {
    todoList: TODOList[];
    dragContent: DragContent;
}

export interface DragContent {
    id: number;
    listID: number;
}