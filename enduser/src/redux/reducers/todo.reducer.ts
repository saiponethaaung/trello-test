import { TODOState } from "../../interfaces/todo";
import { ActionTypes } from "../actions/types";

let initialValue: TODOState = {
    todoList: [],
    dragContent: {
        id: 0,
        listID: 0,
    }
}

const TodoReducer = (state: any = initialValue, action: any) => {
    let newState = state;

    switch (action.type) {
        case ActionTypes.updateTODOListAction:
            newState.todoList = action.payload;
            break;

        case ActionTypes.updateDragContentAction:
            newState.dragContent = action.payload;
            break;
    }

    state = { ...state, ...newState }

    return state;
}

export default TodoReducer;