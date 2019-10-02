export const RENDER = '@CONTAINER/MODAL_WINDOW/render'
export const RE_RENDER = '@CONTAINER/MODAL_WINDOW/re_render'
export const HIDE_MODAL = '@CONTAINER/MODAL_WINDOW/hide_modal'
export const SHOW_PLAY_BAR = '@CONTAINER/MODAL_WINDOW/show_paly_bar'
export const PLAY_BAR_HIDDEN = '@CONTAINER/MODAL_WINDOW/play_bar_hidden'

interface InitBackground {
	type: typeof RENDER | typeof RE_RENDER | typeof HIDE_MODAL | typeof SHOW_PLAY_BAR | typeof PLAY_BAR_HIDDEN
}


export type ActionTypes = InitBackground