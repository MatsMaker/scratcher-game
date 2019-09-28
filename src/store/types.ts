import { ViewPortRotation } from "types/viewPort";

export const VIEW_PORT_RESIZE_ACTION = '@VIEW_PORT/resize';

export interface BaseAction {
	type: typeof VIEW_PORT_RESIZE_ACTION
}

export interface ViewPortState {
	rotation: ViewPortRotation,
	width: number,
	height: number,
	centerHeight: number,
	centerWidth: number,
}

export type VPActionTypes = BaseAction;