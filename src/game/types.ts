export const PLAY = '@GAME/play'
export const RULES_GAME = '@GAME/rules_game'
export const END_ROUND = '@GAME/end_round'

interface InitBackground {
	type: typeof PLAY | typeof RULES_GAME | typeof END_ROUND
}


export type ActionTypes = InitBackground;