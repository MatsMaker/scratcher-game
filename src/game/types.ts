import { ASSETS_IS_LOADED } from "../core/assetsLoader/types"

export const PLAY = '@GAME/play'
export const RULES_GAME = '@GAME/rules_game'
export const END_ROUND = '@GAME/end_round'
export const GET_BONUS = '@GAME/get_bonus'
export const GET_WIN = '@GAME/get_win'
export const START_ROUND = '@GAME/start_round'

interface BaseAction {
	type: typeof PLAY | typeof RULES_GAME | typeof END_ROUND | typeof ASSETS_IS_LOADED | typeof GET_BONUS | typeof GET_WIN | typeof START_ROUND,
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
	win: WinType
	roundWin: WinType
}

export enum BonusType {
	Bonfire,
	Bow,
	Leaf,
	Rope,
	Tent,
	Coin,
	Cash,
	Lose
}

export interface WinType {
	coin: number
	cash: number
}