import { GET_BONUS } from "../../game/types"

export const RENDER = '@CONTAINER/SCRATCHES/render'
export const RE_RENDER = '@CONTAINER/SCRATCHES/re_render'
export const OPEN_SCRATCH = '@CONTAINER/SCRATCHES/OPEN_SCRATCH'
export const UPDATE_SCRATCHES = '@CONTAINER/SCRATCHES/update'

interface BaseType {
	type: typeof RENDER | typeof RE_RENDER | typeof OPEN_SCRATCH | typeof UPDATE_SCRATCHES | typeof GET_BONUS
	payload?: any | Array<ScratchState>
}


export type ActionTypes = BaseType;

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
export interface ScratchState {
	isOpen: boolean
	content: BonusType
	id: number
}

export interface ScratchesState {
	allIsOpen: boolean
	scratches: Array<ScratchState>
}