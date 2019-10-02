import {
	ActionTypes,
	SHOW_PLAY_BAR,
	ModalWindowState,
	PLAY_BAR_HIDDEN
} from './types'

const initialState: ModalWindowState = {
	barIsShowing: false,
}

export function modalWindowReducer(
	state = initialState,
	action: ActionTypes
): ModalWindowState {

	switch (action.type) {
		case SHOW_PLAY_BAR: {
			return {
				...state,
				barIsShowing: true,
			}
		}
		case PLAY_BAR_HIDDEN: {
			return {
				...state,
				barIsShowing: false,
			}
		}
		default:
			return state
	}
}