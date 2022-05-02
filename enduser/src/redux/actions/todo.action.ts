import { DragContent, TODOList } from "../../interfaces/todo";
import { ActionTypes } from "./types";

export interface UpdateTODOListAction {
    type: ActionTypes.updateTODOListAction
    payload: TODOList[],
}

export interface UpdateTODOListFunction {
    (payload: TODOList[]): UpdateTODOListAction
}

export const updateTODOListFunction: UpdateTODOListFunction = (payload: TODOList[]): UpdateTODOListAction => {
    return {
        type: ActionTypes.updateTODOListAction,
        payload,
    };
};

export interface UpdateDragContentAction {
    type: ActionTypes.updateDragContentAction
    payload: DragContent,
}

export interface UpdateDragContentFunction {
    (payload: DragContent): UpdateDragContentAction
}

export const updateDragContentFunction: UpdateDragContentFunction = (payload: DragContent): UpdateDragContentAction => {
    return {
        type: ActionTypes.updateDragContentAction,
        payload,
    };
};