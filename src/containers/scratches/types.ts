export const RENDER = '@CONTAINER/SCRATCHES/render'
export const RE_RENDER = '@CONTAINER/SCRATCHES/re_render'
export const CLEAR_SCRATCH = '@CONTAINER/SCRATCHES/clear_scratch'

interface BaseType {
	type: typeof RENDER | typeof RE_RENDER | typeof CLEAR_SCRATCH
	payload?: any
}


export type ActionTypes = BaseType;


export interface ScratchesState {
	allIsClear: boolean,
}