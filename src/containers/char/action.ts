import { ActionTypes, RENDER_CHAR, RE_RENDER_CHAR } from "./types";

export function renderChar(): ActionTypes {
	return {
		type: RENDER_CHAR,
	}
}

export function  reRenderCharAction(): ActionTypes {
	return {
		type: RE_RENDER_CHAR,
	}
}