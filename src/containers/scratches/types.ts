import { GET_BONUS, BonusType } from "../../game/types"

export const RENDER = '@CONTAINER/SCRATCHES/render'
export const RE_RENDER = '@CONTAINER/SCRATCHES/re_render'
export const ON_HOVERING_SCRATCH = '@CONTAINER/SCRATCHES/ON_HOVERING_SCRATCH'
export const OPEN_SCRATCH = '@CONTAINER/SCRATCHES/OPEN_SCRATCH'
export const RESET_SCRATCHES = '@CONTAINER/SCRATCHES/reset'
export const SET_INTERACTION = '@CONTAINER/SCRATCHES/set_interaction'
export const SCRATCHES_RESTORED = '@CONTAINER/SCRATCHES/restored'

interface BaseType {
	type: typeof RENDER | typeof RE_RENDER | typeof OPEN_SCRATCH | typeof RESET_SCRATCHES | typeof GET_BONUS | typeof SCRATCHES_RESTORED | typeof ON_HOVERING_SCRATCH| typeof SET_INTERACTION 
	payload?: any | Array<ScratchState>
}

export type ActionTypes = BaseType;

export enum ImageSize {
	SMALL,
	BIG
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