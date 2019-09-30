import { RENDER, RE_RENDER, ActionTypes } from './types'

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