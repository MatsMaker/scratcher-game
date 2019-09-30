import { OrientationType } from "../../types/orientation";
import { AreaSizeType } from "core/config/types";

export const VIEW_PORT_RESIZE_ACTION = '@VIEW_PORT/resize';
export const VIEW_PORT_SET_SAVE_AREA = '@VIEW_PORT/set_save_area'
export interface BaseAction {
	type: typeof VIEW_PORT_RESIZE_ACTION | typeof VIEW_PORT_SET_SAVE_AREA,
	payload?: AreaSizeType
}

export interface ViewPortBaseState {
	rotation: OrientationType,
	ratio: number,
	width: number,
	height: number,
	centerWidth: number,
	centerHeight: number,
	saveWidth: number,
	saveHeight: number,
	saveStartX: number,
	saveStartY: number,
	saveCenterWidth: number,
	saveCenterHeight: number,
}
export interface ViewPortState extends ViewPortBaseState{
	cnfgSaveWidth: number,
	cnfgSaveHeight: number,
}

export type VPActionTypes = BaseAction;