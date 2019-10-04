import { PLAY, ActionTypes, RULES_GAME, END_ROUND, GET_BONUS, BonusType, GET_WIN, WinType } from './types'

export function playAction(): ActionTypes {
	return {
		type: PLAY
	}
}

export function getBonusAction(payload: { id: number, bonus: BonusType }): ActionTypes {
	return {
		type: GET_BONUS,
		payload
	}
}

export function getWinAction(payload: WinType): ActionTypes {
	return {
		type: GET_WIN,
		payload
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