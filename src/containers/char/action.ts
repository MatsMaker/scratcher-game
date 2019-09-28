import { ActionTypes, RENDER_CHAR } from "./types";

export function renderChar(): ActionTypes {
	return {
		type: RENDER_CHAR,
	}
}