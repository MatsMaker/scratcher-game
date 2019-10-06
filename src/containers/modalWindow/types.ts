export const RENDER = '@CONTAINER/MODAL_WINDOW/render'
export const RE_RENDER = '@CONTAINER/MODAL_WINDOW/re_render'
export const HIDE_MODAL = '@CONTAINER/MODAL_WINDOW/hide_modal'
export const SHOW_MODAL_WINDOW = '@CONTAINER/MODAL_WINDOW/show_modal_window'
export const MODAL_WINDOW_HIDDEN_START = '@CONTAINER/MODAL_WINDOW/modal_window_hidden/start'
export const MODAL_WINDOW_HIDDEN_END = '@CONTAINER/MODAL_WINDOW/modal_window_hidden/end'


interface InitBackground {
	type: typeof RENDER | typeof RE_RENDER | typeof HIDE_MODAL | typeof SHOW_MODAL_WINDOW | typeof MODAL_WINDOW_HIDDEN_START | typeof MODAL_WINDOW_HIDDEN_END
}

export type ActionTypes = InitBackground


export interface ModalWindowState {
	barIsShowing: boolean
}