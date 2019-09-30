import { RENDER_WIN_UP, ActionTypes, RE_RENDER_WIN_UP } from './types'

export function renderWinUpAction(): ActionTypes {
	return {
		type: RENDER_WIN_UP,
	}
}

export function  reRenderWinUpAction(): ActionTypes {
	return {
		type: RE_RENDER_WIN_UP,
	}
}