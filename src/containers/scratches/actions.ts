import { RENDER, RE_RENDER, ActionTypes, OPEN_SCRATCH, RESET_SCRATCHES, SCRATCHES_RESTORED } from './types'

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

export function resetScratchesAction() {
	return {
		type: RESET_SCRATCHES,
	}
}

export function scratchesRestoredAction(): ActionTypes {
	return {
		type: SCRATCHES_RESTORED,
	}
}

export function openScratcherAction(payload: { id: number }) {
	return {
		type: OPEN_SCRATCH,
		payload,
	}
}