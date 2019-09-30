import { VIEW_PORT_RESIZE_ACTION, VPActionTypes, VIEW_PORT_SET_SAVE_AREA } from "./types";
import { AreaSizeType } from "core/config/types";

export function setAreaSizeAction(payload: AreaSizeType): VPActionTypes {
	return {
		type: VIEW_PORT_SET_SAVE_AREA,
		payload,
	}
}

export function viewPortResizeAction(): VPActionTypes {
	return {
		type: VIEW_PORT_RESIZE_ACTION,
	}
}