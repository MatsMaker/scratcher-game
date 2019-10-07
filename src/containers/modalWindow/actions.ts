import { RENDER, RE_RENDER, ActionTypes, SHOW_MODAL_WINDOW, MODAL_WINDOW_HIDDEN_START, MODAL_WINDOW_HIDDEN_END } from './types'

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

export function hiddenModalWindowStartAction(): ActionTypes {
	return {
		type: MODAL_WINDOW_HIDDEN_START
	}
} 

export function hiddenModalWindowEndAction(): ActionTypes {
	return {
		type: MODAL_WINDOW_HIDDEN_END
	}
} 