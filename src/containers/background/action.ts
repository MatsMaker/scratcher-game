import { RENDER_BACKGROUND, ActionTypes } from './types'

export function renderBackground(): ActionTypes {
	return {
		type: RENDER_BACKGROUND,
	}
}