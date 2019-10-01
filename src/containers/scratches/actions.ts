import { RENDER, RE_RENDER, ActionTypes, CLEAR_SCRATCH } from './types'

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

export function  cleanScratcherAction(payload: any) {
	return {
		type: CLEAR_SCRATCH,
		payload,
	}
}