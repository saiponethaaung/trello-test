import { UpdateDragContentFunction, UpdateTODOListAction } from "./todo.action";

export enum ActionTypes {
    updateTODOListAction,
    updateDragContentAction,
}

export type Action = UpdateTODOListAction | UpdateDragContentFunction;