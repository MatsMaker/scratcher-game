import {
	ActionTypes,
	SHOW_MODAL_WINDOW,
	ModalWindowState,
	MODAL_WINDOW_HIDDEN_END
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
		case MODAL_WINDOW_HIDDEN_END: {
			return {
				...state,
				barIsShowing: false,
			}
		}
		default:
			return state
	}
}