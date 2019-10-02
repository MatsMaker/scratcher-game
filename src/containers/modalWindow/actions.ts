import { RENDER, RE_RENDER, ActionTypes, SHOW_PLAY_BAR } from './types'

export function renderAction(): ActionTypes {
	return {
		type: RENDER,
	}
}

export function  reRenderAction(): ActionTypes {
	return {
		type: RE_RENDER,
	}
}

export function showPlayBarAction(): ActionTypes {
	return {
		type: SHOW_PLAY_BAR
	}
} 