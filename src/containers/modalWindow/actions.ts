import { RENDER, RE_RENDER, ActionTypes, SHOW_MODAL_WINDOW, MODAL_WINDOW_HIDDEN } from './types'

export function renderAction(): ActionTypes {
	return {
		type: RENDER,
	}
}

export function reRenderAction(): ActionTypes {
	return {
		type: RE_RENDER,
	}
}

export function showModalWindowAction(): ActionTypes {
	return {
		type: SHOW_MODAL_WINDOW
	}
}

export function hiddenModalWindowAction(): ActionTypes {
	return {
		type: MODAL_WINDOW_HIDDEN
	}
} 