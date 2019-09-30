export const RENDER = '@CONTAINER/MODAL_WINDOW/render'
export const RE_RENDER = '@CONTAINER/MODAL_WINDOW/re_render'
export const HIDE_MODAL = '@CONTAINER/MODAL_WINDOW/hide_modal'

interface InitBackground {
	type: typeof RENDER | typeof RE_RENDER | typeof HIDE_MODAL
}


export type ActionTypes = InitBackground