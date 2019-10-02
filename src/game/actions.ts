import { PLAY, ActionTypes, RULES_GAME, END_ROUND } from './types'

export function playAction(): ActionTypes {
	return {
		type: PLAY
	}
}

export function rulesAction(): ActionTypes {
	return {
		type: RULES_GAME,
	}
}

export function endRound() {
	return {
		type: END_ROUND
	}
}