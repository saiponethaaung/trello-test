import { combineReducers } from "redux";
import TodoReducer from "./todo.reducer";

export interface StoreState {
    todoState: any;
}

const rootReducer = combineReducers<StoreState>({
    todoState: TodoReducer,
});

export default rootReducer;