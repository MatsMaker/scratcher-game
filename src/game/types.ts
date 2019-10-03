import { ASSETS_IS_LOADED } from "../core/assetsLoader/types"

export const PLAY = '@GAME/play'
export const RULES_GAME = '@GAME/rules_game'
export const END_ROUND = '@GAME/end_round'
export const GET_BONUS = '@GAME/get_bonus'

interface BaseAction {
	type: typeof PLAY | typeof RULES_GAME | typeof END_ROUND | typeof ASSETS_IS_LOADED | typeof GET_BONUS,
	payload?: any
}

export type ActionTypes = BaseAction


export enum GAME_STATE {
	LOAD_GAME = 'LOAD_GAME',
	PREPARE_ROUND = 'PREPARE_ROUND',
	PLAY_ROUND = 'PLAY_ROUND',
	END_ROUND = 'END_ROUND',
}

export interface IGameState {
	gameState: GAME_STATE
}