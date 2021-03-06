import { RENDER, RE_RENDER, ActionTypes, OPEN_SCRATCH, RESET_SCRATCHES, SCRATCHES_RESTORED, ON_HOVERING_SCRATCH, SET_INTERACTION } from './types'

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

export function openScratcherAction(payload: { id: number }): ActionTypes {
	return {
		type: OPEN_SCRATCH,
		payload,
	}
}

export function onMouseoverScratcherAction(): ActionTypes {
	return {
		type: ON_HOVERING_SCRATCH
	}
}

export function setInteractionScratchesAction(payload: {interaction: boolean}): ActionTypes {
	return {
		type: SET_INTERACTION,
		payload
	}
}