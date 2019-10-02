import { RENDER, RE_RENDER, ActionTypes, OPEN_SCRATCH, ScratchState, UPDATE_SCRATCHES } from './types'

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

export function updateScratchesAction(payload: Array<ScratchState>) {
	return {
		type: UPDATE_SCRATCHES,
		payload,
	}
}

export function openScratcherAction(payload: { id: number }) {
	return {
		type: OPEN_SCRATCH,
		payload,
	}
}