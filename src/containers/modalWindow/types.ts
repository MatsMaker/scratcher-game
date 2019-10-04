export const RENDER = '@CONTAINER/MODAL_WINDOW/render'
export const RE_RENDER = '@CONTAINER/MODAL_WINDOW/re_render'
export const HIDE_MODAL = '@CONTAINER/MODAL_WINDOW/hide_modal'
export const SHOW_MODAL_WINDOW = '@CONTAINER/MODAL_WINDOW/show_modal_window'
export const MODAL_WINDOW_HIDDEN = '@CONTAINER/MODAL_WINDOW/modal_window_hidden'

interface InitBackground {
	type: typeof RENDER | typeof RE_RENDER | typeof HIDE_MODAL | typeof SHOW_MODAL_WINDOW | typeof MODAL_WINDOW_HIDDEN
}

export type ActionTypes = InitBackground


export interface ModalWindowState {
	barIsShowing: boolean
}