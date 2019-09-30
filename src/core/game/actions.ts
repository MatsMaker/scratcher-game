import { PLAY, ActionTypes, RULES_GAME } from './types'

export function playAction(): ActionTypes {
	return {
		type: PLAY,
	}
}

export function rulesAction(): ActionTypes {
	return {
		type: RULES_GAME,
	}
}