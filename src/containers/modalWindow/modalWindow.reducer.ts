import {
	ActionTypes,
	SHOW_MODAL_WINDOW,
	ModalWindowState,
	MODAL_WINDOW_HIDDEN
} from './types'

const initialState: ModalWindowState = {
	barIsShowing: false,
}

export function modalWindowReducer(
	state = initialState,
	action: ActionTypes
): ModalWindowState {

	switch (action.type) {
		case SHOW_MODAL_WINDOW: {
			return {
				...state,
				barIsShowing: true,
			}
		}
		case MODAL_WINDOW_HIDDEN: {
			return {
				...state,
				barIsShowing: false,
			}
		}
		default:
			return state
	}
}